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

const JobApplicationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [Name, setName] = useState([])
const [jobName, setJobName] = useState([])

    useEffect(() => {
        let init  = {jobApplicationDate:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [Name,jobName], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.jobApplicationID)) {
                error["jobApplicationID"] = `Job Application ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.resumeURL)) {
                error["resumeURL"] = `Resume URL field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.coverLetter)) {
                error["coverLetter"] = `CoverLetter field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            jobApplicationID: _entity?.jobApplicationID,Name: _entity?.Name?._id,jobName: _entity?.jobName?._id,jobApplicationDate: _entity?.jobApplicationDate,resumeURL: _entity?.resumeURL,coverLetter: _entity?.coverLetter,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("jobApplications").create(_data);
        const eagerResult = await client
            .service("jobApplications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "Name",
                    service : "users",
                    select:["name"]},{
                    path : "jobName",
                    service : "jobs",
                    select:["jobTitle"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Job Applications updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Job Applications" });
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

useEffect(() => {
                    // on mount jobs
                    client
                        .service("jobs")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleJobsId } })
                        .then((res) => {
                            setJobName(res.data.map((e) => { return { name: e['jobTitle'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Jobs", type: "error", message: error.message || "Failed get jobs" });
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

    const NameOptions = Name.map((elem) => ({ name: elem.name, value: elem.value }));
const jobNameOptions = jobName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Job Applications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="jobApplications-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobApplicationID">Job Application ID:</label>
                <InputText id="jobApplicationID" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobApplicationID} onChange={(e) => setValByKey("jobApplicationID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobApplicationID"]) ? (
              <p className="m-0" key="error-jobApplicationID">
                {error["jobApplicationID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Name">Name:</label>
                <Dropdown id="Name" value={_entity?.Name?._id} optionLabel="name" optionValue="value" options={NameOptions} onChange={(e) => setValByKey("Name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Name"]) ? (
              <p className="m-0" key="error-Name">
                {error["Name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobName">Job Name:</label>
                <Dropdown id="jobName" value={_entity?.jobName?._id} optionLabel="name" optionValue="value" options={jobNameOptions} onChange={(e) => setValByKey("jobName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobName"]) ? (
              <p className="m-0" key="error-jobName">
                {error["jobName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="jobApplicationDate">Job Application Date:</label>
                <Calendar id="jobApplicationDate" value={_entity?.jobApplicationDate ? new Date(_entity?.jobApplicationDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("jobApplicationDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobApplicationDate"]) ? (
              <p className="m-0" key="error-jobApplicationDate">
                {error["jobApplicationDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="resumeURL">Resume URL:</label>
                <InputText id="resumeURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.resumeURL} onChange={(e) => setValByKey("resumeURL", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["resumeURL"]) ? (
              <p className="m-0" key="error-resumeURL">
                {error["resumeURL"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="coverLetter">CoverLetter:</label>
                <InputText id="coverLetter" className="w-full mb-3 p-inputtext-sm" value={_entity?.coverLetter} onChange={(e) => setValByKey("coverLetter", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["coverLetter"]) ? (
              <p className="m-0" key="error-coverLetter">
                {error["coverLetter"]}
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

export default connect(mapState, mapDispatch)(JobApplicationsCreateDialogComponent);
