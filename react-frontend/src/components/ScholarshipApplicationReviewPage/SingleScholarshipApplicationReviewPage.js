import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleScholarshipApplicationReviewPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [scholarshipAppID, setScholarshipAppID] = useState([]);
const [admin, setAdmin] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("scholarshipApplicationReview")
            .get(urlParams.singleScholarshipApplicationReviewId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"scholarshipAppID","admin"] }})
            .then((res) => {
                set_entity(res || {});
                const scholarshipAppID = Array.isArray(res.scholarshipAppID)
            ? res.scholarshipAppID.map((elem) => ({ _id: elem._id, scholarshipApplicationID: elem.scholarshipApplicationID }))
            : res.scholarshipAppID
                ? [{ _id: res.scholarshipAppID._id, scholarshipApplicationID: res.scholarshipAppID.scholarshipApplicationID }]
                : [];
        setScholarshipAppID(scholarshipAppID);
const admin = Array.isArray(res.admin)
            ? res.admin.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.admin
                ? [{ _id: res.admin._id, name: res.admin.name }]
                : [];
        setAdmin(admin);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ScholarshipApplicationReview", type: "error", message: error.message || "Failed get scholarshipApplicationReview" });
            });
    }, [props,urlParams.singleScholarshipApplicationReviewId]);


    const goBack = () => {
        navigate("/scholarshipApplicationReview");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ScholarshipApplicationReview</h3>
                </div>
                <p>scholarshipApplicationReview/{urlParams.singleScholarshipApplicationReviewId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Comments</label><p className="m-0 ml-3" >{_entity?.comments}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Approval Date</label><p id="approvalDate" className="m-0 ml-3" >{_entity?.approvalDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Approval Status</label><p className="m-0 ml-3" ><i id="approvalStatus" className={`pi ${_entity?.approvalStatus?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Scholarship Application ID</label>
                    {scholarshipAppID.map((elem) => (
                        <Link key={elem._id} to={`/scholarshipApplications/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.scholarshipApplicationID}</p>
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

export default connect(mapState, mapDispatch)(SingleScholarshipApplicationReviewPage);
