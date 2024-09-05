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
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';

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

const ScholarshipApplicationReviewCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [scholarshipAppID, setScholarshipAppID] = useState([])
const [admin, setAdmin] = useState([])

    useEffect(() => {
        let init  = {approvalStatus: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [scholarshipAppID,admin], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.comments)) {
                error["comments"] = `Comments field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            scholarshipAppID: _entity?.scholarshipAppID?._id,admin: _entity?.admin?._id,comments: _entity?.comments,approvalDate: _entity?.approvalDate,approvalStatus: _entity?.approvalStatus || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("scholarshipApplicationReview").create(_data);
        const eagerResult = await client
            .service("scholarshipApplicationReview")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "scholarshipAppID",
                    service : "scholarshipApplications",
                    select:["scholarshipApplicationID"]},{
                    path : "admin",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info ScholarshipApplicationReview updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in ScholarshipApplicationReview" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount scholarshipApplications
                    client
                        .service("scholarshipApplications")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleScholarshipApplicationsId } })
                        .then((res) => {
                            setScholarshipAppID(res.data.map((e) => { return { name: e['scholarshipApplicationID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "ScholarshipApplications", type: "error", message: error.message || "Failed get scholarshipApplications" });
                        });
                }, []);

useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setAdmin(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const scholarshipAppIDOptions = scholarshipAppID.map((elem) => ({ name: elem.name, value: elem.value }));
const adminOptions = admin.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create ScholarshipApplicationReview" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="scholarshipApplicationReview-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="scholarshipAppID">Scholarship Application ID:</label>
                <Dropdown id="scholarshipAppID" value={_entity?.scholarshipAppID?._id} optionLabel="name" optionValue="value" options={scholarshipAppIDOptions} onChange={(e) => setValByKey("scholarshipAppID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scholarshipAppID"]) ? (
              <p className="m-0" key="error-scholarshipAppID">
                {error["scholarshipAppID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="admin">Admin:</label>
                <Dropdown id="admin" value={_entity?.admin?._id} optionLabel="name" optionValue="value" options={adminOptions} onChange={(e) => setValByKey("admin", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["admin"]) ? (
              <p className="m-0" key="error-admin">
                {error["admin"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="comments">Comments:</label>
                <InputTextarea id="comments" rows={5} cols={30} value={_entity?.comments} onChange={ (e) => setValByKey("comments", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["comments"]) ? (
              <p className="m-0" key="error-comments">
                {error["comments"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="approvalDate">Approval Date:</label>
                <Calendar id="approvalDate"  value={_entity?.approvalDate ? new Date(_entity?.approvalDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("approvalDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvalDate"]) ? (
              <p className="m-0" key="error-approvalDate">
                {error["approvalDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex mt-5">
            <span className="align-items-center">
                <label htmlFor="approvalStatus">Approval Status:</label>
                <Checkbox id="approvalStatus" className="ml-3" checked={_entity?.approvalStatus} onChange={(e) => setValByKey("approvalStatus", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvalStatus"]) ? (
              <p className="m-0" key="error-approvalStatus">
                {error["approvalStatus"]}
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

export default connect(mapState, mapDispatch)(ScholarshipApplicationReviewCreateDialogComponent);
