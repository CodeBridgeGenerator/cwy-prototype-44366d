import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import { Calendar } from 'primereact/calendar';

const SinglePaymentsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [payeeName, setPayeeName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("payments")
            .get(urlParams.singlePaymentsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"payeeName"] }})
            .then((res) => {
                set_entity(res || {});
                const payeeName = Array.isArray(res.payeeName)
            ? res.payeeName.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.payeeName
                ? [{ _id: res.payeeName._id, name: res.payeeName.name }]
                : [];
        setPayeeName(payeeName);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Payments", type: "error", message: error.message || "Failed get payments" });
            });
    }, [props,urlParams.singlePaymentsId]);


    const goBack = () => {
        navigate("/payments");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Payments</h3>
                </div>
                <p>payments/{urlParams.singlePaymentsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Payment ID</label><p className="m-0 ml-3" >{_entity?.paymentID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Receipt URL</label><p className="m-0 ml-3" >{_entity?.receiptURL}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Payment Date</label><p id="paymentDate" className="m-0 ml-3" >{_entity?.paymentDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Payment Amount</label><p className="m-0 ml-3" >{Number(_entity?.paymentamount)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Payee Name</label>
                    {payeeName.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SinglePaymentsPage);
