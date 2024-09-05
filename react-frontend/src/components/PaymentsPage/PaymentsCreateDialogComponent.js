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
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [payeeName, setPayeeName] = useState([])

    useEffect(() => {
        let init  = {paymentDate:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [payeeName], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.paymentID)) {
                error["paymentID"] = `Payment ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.receiptURL)) {
                error["receiptURL"] = `Receipt URL field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            paymentID: _entity?.paymentID,payeeName: _entity?.payeeName?._id,paymentStatus: _entity?.paymentStatus,paymentMethod: _entity?.paymentMethod,receiptURL: _entity?.receiptURL,paymentDate: _entity?.paymentDate,paymentamount: _entity?.paymentamount,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("payments").create(_data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "payeeName",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Payments updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Payments" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount users
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
        <Dialog header="Create Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="paymentID">Payment ID:</label>
                <InputText id="paymentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentID} onChange={(e) => setValByKey("paymentID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentID"]) ? (
              <p className="m-0" key="error-paymentID">
                {error["paymentID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="payeeName">Payee Name:</label>
                <Dropdown id="payeeName" value={_entity?.payeeName?._id} optionLabel="name" optionValue="value" options={payeeNameOptions} onChange={(e) => setValByKey("payeeName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["payeeName"]) ? (
              <p className="m-0" key="error-payeeName">
                {error["payeeName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="paymentStatus">Payment Status:</label>
                <Dropdown id="paymentStatus" value={_entity?.paymentStatus} options={paymentStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentStatus", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentStatus"]) ? (
              <p className="m-0" key="error-paymentStatus">
                {error["paymentStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <Dropdown id="paymentMethod" value={_entity?.paymentMethod} options={paymentMethodOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentMethod", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) ? (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="receiptURL">Receipt URL:</label>
                <InputText id="receiptURL" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptURL} onChange={(e) => setValByKey("receiptURL", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptURL"]) ? (
              <p className="m-0" key="error-receiptURL">
                {error["receiptURL"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="paymentDate">Payment Date:</label>
                <Calendar id="paymentDate" value={_entity?.paymentDate ? new Date(_entity?.paymentDate) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("paymentDate", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentDate"]) ? (
              <p className="m-0" key="error-paymentDate">
                {error["paymentDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="paymentamount">Payment Amount:</label>
                <InputNumber id="paymentamount" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentamount} onChange={(e) => setValByKey("paymentamount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentamount"]) ? (
              <p className="m-0" key="error-paymentamount">
                {error["paymentamount"]}
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

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
