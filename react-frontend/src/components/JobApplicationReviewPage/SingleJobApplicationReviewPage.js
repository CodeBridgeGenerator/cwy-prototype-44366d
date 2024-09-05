import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleJobApplicationReviewPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [jobAppID, setJobAppID] = useState([]);
const [admin, setAdmin] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("jobApplicationReview")
            .get(urlParams.singleJobApplicationReviewId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"jobAppID","admin"] }})
            .then((res) => {
                set_entity(res || {});
                const jobAppID = Array.isArray(res.jobAppID)
            ? res.jobAppID.map((elem) => ({ _id: elem._id, jobApplicationID: elem.jobApplicationID }))
            : res.jobAppID
                ? [{ _id: res.jobAppID._id, jobApplicationID: res.jobAppID.jobApplicationID }]
                : [];
        setJobAppID(jobAppID);
const admin = Array.isArray(res.admin)
            ? res.admin.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.admin
                ? [{ _id: res.admin._id, name: res.admin.name }]
                : [];
        setAdmin(admin);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "JobApplicationReview", type: "error", message: error.message || "Failed get jobApplicationReview" });
            });
    }, [props,urlParams.singleJobApplicationReviewId]);


    const goBack = () => {
        navigate("/jobApplicationReview");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">JobApplicationReview</h3>
                </div>
                <p>jobApplicationReview/{urlParams.singleJobApplicationReviewId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Comments</label><p className="m-0 ml-3" >{_entity?.comments}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Approval Date</label><p id="approvalDate" className="m-0 ml-3" >{_entity?.approvalDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Approval Status</label><p className="m-0 ml-3" ><i id="approvalStatus" className={`pi ${_entity?.approvalStatus?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Job Application ID</label>
                    {jobAppID.map((elem) => (
                        <Link key={elem._id} to={`/jobApplications/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.jobApplicationID}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Admin</label>
                    {admin.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleJobApplicationReviewPage);
