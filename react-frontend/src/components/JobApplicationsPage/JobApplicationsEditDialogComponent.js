import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const JobApplicationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [Name, setName] = useState([])
const [jobName, setJobName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
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
                    //on mount jobs
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

    const onSave = async () => {
        let _data = {
            jobApplicationID: _entity?.jobApplicationID,
Name: _entity?.Name?._id,
jobName: _entity?.jobName?._id,
jobApplicationDate: _entity?.jobApplicationDate,
resumeURL: _entity?.resumeURL,
coverLetter: _entity?.coverLetter,
        };

        setLoading(true);
        try {
            
        await client.service("jobApplications").patch(_entity._id, _data);
        const eagerResult = await client
            .service("jobApplications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "Name",
                    service : "users",
                    select:["name"]},{
                    path : "jobName",
                    service : "jobs",
                    select:["jobTitle"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info jobApplications updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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

    const NameOptions = Name.map((elem) => ({ name: elem.name, value: elem.value }));
const jobNameOptions = jobName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Job Applications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="jobApplications-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="jobApplicationID">Job Application ID:</label>
            <InputText id="jobApplicationID" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobApplicationID} onChange={(e) => setValByKey("jobApplicationID", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="Name">Name:</label>
            <Dropdown id="Name" value={_entity?.Name?._id} optionLabel="name" optionValue="value" options={NameOptions} onChange={(e) => setValByKey("Name", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="jobName">Job Name:</label>
            <Dropdown id="jobName" value={_entity?.jobName?._id} optionLabel="name" optionValue="value" options={jobNameOptions} onChange={(e) => setValByKey("jobName", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="jobApplicationDate">Job Application Date:</label>
            <Calendar id="jobApplicationDate" value={_entity?.jobApplicationDate ? new Date(_entity?.jobApplicationDate) : new Date()} onChange={ (e) => setValByKey("jobApplicationDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="resumeURL">Resume URL:</label>
            <InputText id="resumeURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.resumeURL} onChange={(e) => setValByKey("resumeURL", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="coverLetter">CoverLetter:</label>
            <InputText id="coverLetter" className="w-full mb-3 p-inputtext-sm" value={_entity?.coverLetter} onChange={(e) => setValByKey("coverLetter", e.target.value)}  required  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
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
