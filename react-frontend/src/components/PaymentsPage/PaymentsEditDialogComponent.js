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
import { InputNumber } from 'primereact/inputnumber';
const paymentStatusObject = JSON.parse('{"0":"Pending","1":"Completed","2":"Failed"}');
const paymentStatusOptions = Object.entries(paymentStatusObject).map((x,i) => ({ name: x[1], value: x[0] }));
const paymentMethodObject = JSON.parse('{"0":"CreditCard","1":"BankTransfer","2":"Cash"}');
const paymentMethodOptions = Object.entries(paymentMethodObject).map((x,i) => ({ name: x[1], value: x[0] }));
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

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [payeeName, setPayeeName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setPayeeName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            paymentID: _entity?.paymentID,
payeeName: _entity?.payeeName?._id,
paymentStatus: _entity?.paymentStatus,
paymentMethod: _entity?.paymentMethod,
receiptURL: _entity?.receiptURL,
paymentDate: _entity?.paymentDate,
paymentamount: _entity?.paymentamount,
        };

        setLoading(true);
        try {
            
        await client.service("payments").patch(_entity._id, _data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "payeeName",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info payments updated successfully" });
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

    const payeeNameOptions = payeeName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="paymentID">Payment ID:</label>
            <InputText id="paymentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentID} onChange={(e) => setValByKey("paymentID", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="payeeName">Payee Name:</label>
            <Dropdown id="payeeName" value={_entity?.payeeName?._id} optionLabel="name" optionValue="value" options={payeeNameOptions} onChange={(e) => setValByKey("payeeName", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="paymentStatus">Payment Status:</label>
            <Dropdown id="paymentStatus" value={_entity?.paymentStatus} options={paymentStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentStatus", e.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <Dropdown id="paymentMethod" value={_entity?.paymentMethod} options={paymentMethodOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentMethod", e.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="receiptURL">Receipt URL:</label>
            <InputText id="receiptURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptURL} onChange={(e) => setValByKey("receiptURL", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="paymentDate">Payment Date:</label>
            <Calendar id="paymentDate" value={_entity?.paymentDate ? new Date(_entity?.paymentDate) : new Date()} onChange={ (e) => setValByKey("paymentDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="paymentamount">Payment Amount:</label>
            <InputNumber id="paymentamount" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentamount} onChange={(e) => setValByKey("paymentamount", e.value)}  />
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

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
