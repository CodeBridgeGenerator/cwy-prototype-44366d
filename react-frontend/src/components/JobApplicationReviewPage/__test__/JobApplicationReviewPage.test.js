import React from "react";
import { render, screen } from "@testing-library/react";

import JobApplicationReviewPage from "../JobApplicationReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobApplicationReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobApplicationReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobApplicationReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobApplicationReview-add-button")).toBeInTheDocument();
});
