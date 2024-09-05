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

const MemberProfileCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])

    useEffect(() => {
        let init  = {dateOfBirth:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [name], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.gender)) {
                error["gender"] = `Gender field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.phonenumber)) {
                error["phonenumber"] = `Phone Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.address)) {
                error["address"] = `Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.educationlevel)) {
                error["educationlevel"] = `Education Level field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.nationality)) {
                error["nationality"] = `Nationality field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.IDnumber)) {
                error["IDnumber"] = `ID Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.previousInstituteName)) {
                error["previousInstituteName"] = `Previous Institute Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.employmentStatus)) {
                error["employmentStatus"] = `Employment Status field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.skills)) {
                error["skills"] = `Skills field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name?._id,dateOfBirth: _entity?.dateOfBirth,gender: _entity?.gender,phonenumber: _entity?.phonenumber,address: _entity?.address,educationlevel: _entity?.educationlevel,nationality: _entity?.nationality,IDnumber: _entity?.IDnumber,previousInstituteName: _entity?.previousInstituteName,employmentStatus: _entity?.employmentStatus,skills: _entity?.skills,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("memberProfile").create(_data);
        const eagerResult = await client
            .service("memberProfile")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Member Profile updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Member Profile" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
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
        <Dialog header="Create Member Profile" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memberProfile-create-dialog-component">
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
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <Calendar id="dateOfBirth" value={_entity?.dateOfBirth ? new Date(_entity?.dateOfBirth) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateOfBirth", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateOfBirth"]) ? (
              <p className="m-0" key="error-dateOfBirth">
                {error["dateOfBirth"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="gender">Gender:</label>
                <InputText id="gender" className="w-full mb-3 p-inputtext-sm" value={_entity?.gender} onChange={(e) => setValByKey("gender", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["gender"]) ? (
              <p className="m-0" key="error-gender">
                {error["gender"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="phonenumber">Phone Number:</label>
                <InputText id="phonenumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.phonenumber} onChange={(e) => setValByKey("phonenumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phonenumber"]) ? (
              <p className="m-0" key="error-phonenumber">
                {error["phonenumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="educationlevel">Education Level:</label>
                <InputText id="educationlevel" className="w-full mb-3 p-inputtext-sm" value={_entity?.educationlevel} onChange={(e) => setValByKey("educationlevel", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["educationlevel"]) ? (
              <p className="m-0" key="error-educationlevel">
                {error["educationlevel"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="nationality">Nationality:</label>
                <InputText id="nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.nationality} onChange={(e) => setValByKey("nationality", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nationality"]) ? (
              <p className="m-0" key="error-nationality">
                {error["nationality"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="IDnumber">ID Number:</label>
                <InputText id="IDnumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.IDnumber} onChange={(e) => setValByKey("IDnumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["IDnumber"]) ? (
              <p className="m-0" key="error-IDnumber">
                {error["IDnumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="previousInstituteName">Previous Institute Name:</label>
                <InputText id="previousInstituteName" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousInstituteName} onChange={(e) => setValByKey("previousInstituteName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousInstituteName"]) ? (
              <p className="m-0" key="error-previousInstituteName">
                {error["previousInstituteName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="employmentStatus">Employment Status:</label>
                <InputText id="employmentStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.employmentStatus} onChange={(e) => setValByKey("employmentStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employmentStatus"]) ? (
              <p className="m-0" key="error-employmentStatus">
                {error["employmentStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="skills">Skills:</label>
                <InputText id="skills" className="w-full mb-3 p-inputtext-sm" value={_entity?.skills} onChange={(e) => setValByKey("skills", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["skills"]) ? (
              <p className="m-0" key="error-skills">
                {error["skills"]}
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

export default connect(mapState, mapDispatch)(MemberProfileCreateDialogComponent);
