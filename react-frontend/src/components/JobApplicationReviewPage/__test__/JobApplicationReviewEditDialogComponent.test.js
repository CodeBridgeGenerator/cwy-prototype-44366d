import React from "react";
import { render, screen } from "@testing-library/react";

import JobApplicationReviewEditDialogComponent from "../JobApplicationReviewEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobApplicationReview edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobApplicationReviewEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobApplicationReview-edit-dialog-component")).toBeInTheDocument();
});
