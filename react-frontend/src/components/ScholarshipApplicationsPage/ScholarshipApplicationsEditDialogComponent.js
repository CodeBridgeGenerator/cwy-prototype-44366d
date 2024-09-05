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

const ScholarshipApplicationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])
const [scholarshipName, setScholarshipName] = useState([])

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
                    //on mount scholarships
                    client
                        .service("scholarships")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleScholarshipsId } })
                        .then((res) => {
                            setScholarshipName(res.data.map((e) => { return { name: e['scholarshipName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Scholarships", type: "error", message: error.message || "Failed get scholarships" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            scholarshipApplicationID: _entity?.scholarshipApplicationID,
name: _entity?.name?._id,
scholarshipName: _entity?.scholarshipName?._id,
scholarshipApplicationDate: _entity?.scholarshipApplicationDate,
essayURL: _entity?.essayURL,
recommendationLetterURL: _entity?.recommendationLetterURL,
        };

        setLoading(true);
        try {
            
        await client.service("scholarshipApplications").patch(_entity._id, _data);
        const eagerResult = await client
            .service("scholarshipApplications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]},{
                    path : "scholarshipName",
                    service : "scholarships",
                    select:["scholarshipName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info scholarshipApplications updated successfully" });
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

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));
const scholarshipNameOptions = scholarshipName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit ScholarshipApplications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="scholarshipApplications-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="scholarshipApplicationID">ScholarshipApplicationID:</label>
            <InputText id="scholarshipApplicationID" className="w-full mb-3 p-inputtext-sm" value={_entity?.scholarshipApplicationID} onChange={(e) => setValByKey("scholarshipApplicationID", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="name">Name:</label>
            <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="scholarshipName">Scholarship Name:</label>
            <Dropdown id="scholarshipName" value={_entity?.scholarshipName?._id} optionLabel="name" optionValue="value" options={scholarshipNameOptions} onChange={(e) => setValByKey("scholarshipName", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="scholarshipApplicationDate">Scholarship Application Date:</label>
            <Calendar id="scholarshipApplicationDate" value={_entity?.scholarshipApplicationDate ? new Date(_entity?.scholarshipApplicationDate) : new Date()} onChange={ (e) => setValByKey("scholarshipApplicationDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="essayURL">Essay URL:</label>
            <InputText id="essayURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.essayURL} onChange={(e) => setValByKey("essayURL", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="recommendationLetterURL">Recommendation Letter URL:</label>
            <InputText id="recommendationLetterURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.recommendationLetterURL} onChange={(e) => setValByKey("recommendationLetterURL", e.target.value)}  required  />
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

export default connect(mapState, mapDispatch)(ScholarshipApplicationsCreateDialogComponent);
