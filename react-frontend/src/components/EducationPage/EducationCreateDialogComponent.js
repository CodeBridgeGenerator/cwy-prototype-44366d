import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const EducationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])

    useEffect(() => {
        let init  = {startDate:new Date(),endDate:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [name], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.NameofInstitution)) {
                error["NameofInstitution"] = `Name of Institution field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.EducationLevel)) {
                error["EducationLevel"] = `Education Level field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.FieldofStudy)) {
                error["FieldofStudy"] = `Field of Study field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name?._id,NameofInstitution: _entity?.NameofInstitution,EducationLevel: _entity?.EducationLevel,FieldofStudy: _entity?.FieldofStudy,startDate: _entity?.startDate,endDate: _entity?.endDate,Grade: _entity?.Grade,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("education").create(_data);
        const eagerResult = await client
            .service("education")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "name",
                    service : "memberProfile",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Education updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Education" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount memberProfile
                    client
                        .service("memberProfile")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemberProfileId } })
                        .then((res) => {
                            setName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemberProfile", type: "error", message: error.message || "Failed get memberProfile" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Education" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="education-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="NameofInstitution">Name of Institution:</label>
                <InputText id="NameofInstitution" className="w-full mb-3 p-inputtext-sm" value={_entity?.NameofInstitution} onChange={(e) => setValByKey("NameofInstitution", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["NameofInstitution"]) ? (
              <p className="m-0" key="error-NameofInstitution">
                {error["NameofInstitution"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="EducationLevel">Education Level:</label>
                <InputText id="EducationLevel" className="w-full mb-3 p-inputtext-sm" value={_entity?.EducationLevel} onChange={(e) => setValByKey("EducationLevel", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["EducationLevel"]) ? (
              <p className="m-0" key="error-EducationLevel">
                {error["EducationLevel"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="FieldofStudy">Field of Study:</label>
                <InputText id="FieldofStudy" className="w-full mb-3 p-inputtext-sm" value={_entity?.FieldofStudy} onChange={(e) => setValByKey("FieldofStudy", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["FieldofStudy"]) ? (
              <p className="m-0" key="error-FieldofStudy">
                {error["FieldofStudy"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="startDate">Start Date:</label>
                <Calendar id="startDate" value={_entity?.startDate ? new Date(_entity?.startDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) ? (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="endDate">End Date:</label>
                <Calendar id="endDate" value={_entity?.endDate ? new Date(_entity?.endDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("endDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endDate"]) ? (
              <p className="m-0" key="error-endDate">
                {error["endDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Grade">Grade:</label>
                <InputNumber id="Grade" className="w-full mb-3 p-inputtext-sm" value={_entity?.Grade} onChange={(e) => setValByKey("Grade", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Grade"]) ? (
              <p className="m-0" key="error-Grade">
                {error["Grade"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(EducationCreateDialogComponent);
