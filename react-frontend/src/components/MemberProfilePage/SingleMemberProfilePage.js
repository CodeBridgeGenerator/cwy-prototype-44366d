import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import EducationPage from "../EducationPage/EducationPage";
import ExperiencePage from "../ExperiencePage/ExperiencePage";
import InstitutionsPage from "../InstitutionsPage/InstitutionsPage";
import MemberInstitutionsPage from "../MemberInstitutionsPage/MemberInstitutionsPage";
import { Calendar } from 'primereact/calendar';

const SingleMemberProfilePage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [name, setName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("memberProfile")
            .get(urlParams.singleMemberProfileId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"name"] }})
            .then((res) => {
                set_entity(res || {});
                const name = Array.isArray(res.name)
            ? res.name.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.name
                ? [{ _id: res.name._id, name: res.name.name }]
                : [];
        setName(name);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MemberProfile", type: "error", message: error.message || "Failed get memberProfile" });
            });
    }, [props,urlParams.singleMemberProfileId]);


    const goBack = () => {
        navigate("/memberProfile");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Member Profile</h3>
                </div>
                <p>memberProfile/{urlParams.singleMemberProfileId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Date Of Birth</label><p id="dateOfBirth" className="m-0 ml-3" >{_entity?.dateOfBirth}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Gender</label><p className="m-0 ml-3" >{_entity?.gender}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Phone Number</label><p className="m-0 ml-3" >{_entity?.phonenumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address</label><p className="m-0 ml-3" >{_entity?.address}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Education Level</label><p className="m-0 ml-3" >{_entity?.educationlevel}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Nationality</label><p className="m-0 ml-3" >{_entity?.nationality}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ID Number</label><p className="m-0 ml-3" >{_entity?.IDnumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Previous Institute Name</label><p className="m-0 ml-3" >{_entity?.previousInstituteName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Employment Status</label><p className="m-0 ml-3" >{_entity?.employmentStatus}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Skills</label><p className="m-0 ml-3" >{_entity?.skills}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Name</label>
                    {name.map((elem) => (
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
        <EducationPage/>
<ExperiencePage/>
<InstitutionsPage/>
<MemberInstitutionsPage/>
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

export default connect(mapState, mapDispatch)(SingleMemberProfilePage);
