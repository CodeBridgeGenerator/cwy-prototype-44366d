import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const ScholarshipsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {applicationDeadline:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.scholarshipID)) {
                error["scholarshipID"] = `Scholarship ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.scholarshipName)) {
                error["scholarshipName"] = `Scholarship Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.scholarshipDescription)) {
                error["scholarshipDescription"] = `Scholarship Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.eligibilityCriteria)) {
                error["eligibilityCriteria"] = `Eligibility Criteria field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            scholarshipID: _entity?.scholarshipID,scholarshipName: _entity?.scholarshipName,scholarshipDescription: _entity?.scholarshipDescription,eligibilityCriteria: _entity?.eligibilityCriteria,applicationDeadline: _entity?.applicationDeadline,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("scholarships").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Scholarships created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Scholarships" });
        }
        setLoading(false);
    };

    

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

    

    return (
        <Dialog header="Create Scholarships" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="scholarships-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="scholarshipID">Scholarship ID:</label>
                <InputText id="scholarshipID" className="w-full mb-3 p-inputtext-sm" value={_entity?.scholarshipID} onChange={(e) => setValByKey("scholarshipID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scholarshipID"]) ? (
              <p className="m-0" key="error-scholarshipID">
                {error["scholarshipID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="scholarshipName">Scholarship Name:</label>
                <InputText id="scholarshipName" className="w-full mb-3 p-inputtext-sm" value={_entity?.scholarshipName} onChange={(e) => setValByKey("scholarshipName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scholarshipName"]) ? (
              <p className="m-0" key="error-scholarshipName">
                {error["scholarshipName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="scholarshipDescription">Scholarship Description:</label>
                <InputText id="scholarshipDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.scholarshipDescription} onChange={(e) => setValByKey("scholarshipDescription", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scholarshipDescription"]) ? (
              <p className="m-0" key="error-scholarshipDescription">
                {error["scholarshipDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="eligibilityCriteria">Eligibility Criteria:</label>
                <InputText id="eligibilityCriteria" className="w-full mb-3 p-inputtext-sm" value={_entity?.eligibilityCriteria} onChange={(e) => setValByKey("eligibilityCriteria", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["eligibilityCriteria"]) ? (
              <p className="m-0" key="error-eligibilityCriteria">
                {error["eligibilityCriteria"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="applicationDeadline">Application Deadline:</label>
                <Calendar id="applicationDeadline" value={_entity?.applicationDeadline ? new Date(_entity?.applicationDeadline) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("applicationDeadline", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationDeadline"]) ? (
              <p className="m-0" key="error-applicationDeadline">
                {error["applicationDeadline"]}
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

export default connect(mapState, mapDispatch)(ScholarshipsCreateDialogComponent);
