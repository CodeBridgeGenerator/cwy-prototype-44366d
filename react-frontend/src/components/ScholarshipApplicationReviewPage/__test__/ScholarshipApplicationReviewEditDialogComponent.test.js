import React from "react";
import { render, screen } from "@testing-library/react";

import ScholarshipApplicationReviewEditDialogComponent from "../ScholarshipApplicationReviewEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scholarshipApplicationReview edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScholarshipApplicationReviewEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scholarshipApplicationReview-edit-dialog-component")).toBeInTheDocument();
});
