import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import ScholarshipApplicationReviewPage from "../ScholarshipApplicationReviewPage/ScholarshipApplicationReviewPage";
import { Calendar } from 'primereact/calendar';

const SingleScholarshipApplicationsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [name, setName] = useState([]);
const [scholarshipName, setScholarshipName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("scholarshipApplications")
            .get(urlParams.singleScholarshipApplicationsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"name","scholarshipName"] }})
            .then((res) => {
                set_entity(res || {});
                const name = Array.isArray(res.name)
            ? res.name.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.name
                ? [{ _id: res.name._id, name: res.name.name }]
                : [];
        setName(name);
const scholarshipName = Array.isArray(res.scholarshipName)
            ? res.scholarshipName.map((elem) => ({ _id: elem._id, scholarshipName: elem.scholarshipName }))
            : res.scholarshipName
                ? [{ _id: res.scholarshipName._id, scholarshipName: res.scholarshipName.scholarshipName }]
                : [];
        setScholarshipName(scholarshipName);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ScholarshipApplications", type: "error", message: error.message || "Failed get scholarshipApplications" });
            });
    }, [props,urlParams.singleScholarshipApplicationsId]);


    const goBack = () => {
        navigate("/scholarshipApplications");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ScholarshipApplications</h3>
                </div>
                <p>scholarshipApplications/{urlParams.singleScholarshipApplicationsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ScholarshipApplicationID</label><p className="m-0 ml-3" >{_entity?.scholarshipApplicationID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Scholarship Application Date</label><p id="scholarshipApplicationDate" className="m-0 ml-3" >{_entity?.scholarshipApplicationDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Essay URL</label><p className="m-0 ml-3" >{_entity?.essayURL}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Recommendation Letter URL</label><p className="m-0 ml-3" >{_entity?.recommendationLetterURL}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Name</label>
                    {name.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Scholarship Name</label>
                    {scholarshipName.map((elem) => (
                        <Link key={elem._id} to={`/scholarships/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.scholarshipName}</p>
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
        <ScholarshipApplicationReviewPage/>
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

export default connect(mapState, mapDispatch)(SingleScholarshipApplicationsPage);
