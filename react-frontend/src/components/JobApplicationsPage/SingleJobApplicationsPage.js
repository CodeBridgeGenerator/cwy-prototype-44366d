import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import JobApplicationReviewPage from "../JobApplicationReviewPage/JobApplicationReviewPage";
import { Calendar } from 'primereact/calendar';

const SingleJobApplicationsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [Name, setName] = useState([]);
const [jobName, setJobName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("jobApplications")
            .get(urlParams.singleJobApplicationsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"Name","jobName"] }})
            .then((res) => {
                set_entity(res || {});
                const Name = Array.isArray(res.Name)
            ? res.Name.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.Name
                ? [{ _id: res.Name._id, name: res.Name.name }]
                : [];
        setName(Name);
const jobName = Array.isArray(res.jobName)
            ? res.jobName.map((elem) => ({ _id: elem._id, jobTitle: elem.jobTitle }))
            : res.jobName
                ? [{ _id: res.jobName._id, jobTitle: res.jobName.jobTitle }]
                : [];
        setJobName(jobName);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "JobApplications", type: "error", message: error.message || "Failed get jobApplications" });
            });
    }, [props,urlParams.singleJobApplicationsId]);


    const goBack = () => {
        navigate("/jobApplications");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Job Applications</h3>
                </div>
                <p>jobApplications/{urlParams.singleJobApplicationsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Job Application ID</label><p className="m-0 ml-3" >{_entity?.jobApplicationID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Job Application Date</label><p id="jobApplicationDate" className="m-0 ml-3" >{_entity?.jobApplicationDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Resume URL</label><p className="m-0 ml-3" >{_entity?.resumeURL}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">CoverLetter</label><p className="m-0 ml-3" >{_entity?.coverLetter}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Name</label>
                    {Name.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Job Name</label>
                    {jobName.map((elem) => (
                        <Link key={elem._id} to={`/jobs/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.jobTitle}</p>
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
        <JobApplicationReviewPage/>
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

export default connect(mapState, mapDispatch)(SingleJobApplicationsPage);
