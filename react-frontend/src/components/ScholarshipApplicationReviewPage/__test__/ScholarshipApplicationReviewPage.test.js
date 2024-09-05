import React from "react";
import { render, screen } from "@testing-library/react";

import ScholarshipApplicationReviewPage from "../ScholarshipApplicationReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scholarshipApplicationReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScholarshipApplicationReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scholarshipApplicationReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("scholarshipApplicationReview-add-button")).toBeInTheDocument();
});
