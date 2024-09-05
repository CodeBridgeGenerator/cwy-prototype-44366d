import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import ScholarshipApplicationsPage from "../ScholarshipApplicationsPage/ScholarshipApplicationsPage";
import { Calendar } from 'primereact/calendar';

const SingleScholarshipsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("scholarships")
            .get(urlParams.singleScholarshipsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Scholarships", type: "error", message: error.message || "Failed get scholarships" });
            });
    }, [props,urlParams.singleScholarshipsId]);


    const goBack = () => {
        navigate("/scholarships");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Scholarships</h3>
                </div>
                <p>scholarships/{urlParams.singleScholarshipsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Scholarship ID</label><p className="m-0 ml-3" >{_entity?.scholarshipID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Scholarship Name</label><p className="m-0 ml-3" >{_entity?.scholarshipName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Scholarship Description</label><p className="m-0 ml-3" >{_entity?.scholarshipDescription}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Eligibility Criteria</label><p className="m-0 ml-3" >{_entity?.eligibilityCriteria}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Application Deadline</label><p id="applicationDeadline" className="m-0 ml-3" >{_entity?.applicationDeadline}</p></div>
            

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
        <ScholarshipApplicationsPage/>
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

export default connect(mapState, mapDispatch)(SingleScholarshipsPage);
