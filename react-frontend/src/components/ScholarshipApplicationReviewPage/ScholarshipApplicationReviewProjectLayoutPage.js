import React from "react";
import ProjectLayout from "../Layouts/ProjectLayout";
import { connect } from "react-redux";
import ScholarshipApplicationReviewPage from "./ScholarshipApplicationReviewPage";

const ScholarshipApplicationReviewProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <ScholarshipApplicationReviewPage />
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

export default connect(mapState, mapDispatch)(ScholarshipApplicationReviewProjectLayoutPage);