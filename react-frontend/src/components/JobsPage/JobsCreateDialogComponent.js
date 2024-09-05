import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const JobsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.jobID)) {
                error["jobID"] = `Job ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.jobTitle)) {
                error["jobTitle"] = `Job Title field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.jobDescription)) {
                error["jobDescription"] = `Job Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.jobRequirements)) {
                error["jobRequirements"] = `Job Requirements field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.companyName)) {
                error["companyName"] = `Company Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.location)) {
                error["location"] = `Location field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            jobID: _entity?.jobID,jobTitle: _entity?.jobTitle,jobDescription: _entity?.jobDescription,jobRequirements: _entity?.jobRequirements,companyName: _entity?.companyName,location: _entity?.location,salary: _entity?.salary,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("jobs").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Jobs created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Jobs" });
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
        <Dialog header="Create Jobs" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="jobs-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobID">Job ID:</label>
                <InputText id="jobID" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobID} onChange={(e) => setValByKey("jobID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobID"]) ? (
              <p className="m-0" key="error-jobID">
                {error["jobID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobTitle">Job Title:</label>
                <InputText id="jobTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobTitle} onChange={(e) => setValByKey("jobTitle", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobTitle"]) ? (
              <p className="m-0" key="error-jobTitle">
                {error["jobTitle"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobDescription">Job Description:</label>
                <InputText id="jobDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobDescription} onChange={(e) => setValByKey("jobDescription", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobDescription"]) ? (
              <p className="m-0" key="error-jobDescription">
                {error["jobDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobRequirements">Job Requirements:</label>
                <InputText id="jobRequirements" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobRequirements} onChange={(e) => setValByKey("jobRequirements", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobRequirements"]) ? (
              <p className="m-0" key="error-jobRequirements">
                {error["jobRequirements"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="companyName">Company Name:</label>
                <InputText id="companyName" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyName} onChange={(e) => setValByKey("companyName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyName"]) ? (
              <p className="m-0" key="error-companyName">
                {error["companyName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="salary">Salary:</label>
                <InputNumber id="salary" className="w-full mb-3 p-inputtext-sm" value={_entity?.salary} onChange={(e) => setValByKey("salary", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["salary"]) ? (
              <p className="m-0" key="error-salary">
                {error["salary"]}
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

export default connect(mapState, mapDispatch)(JobsCreateDialogComponent);
