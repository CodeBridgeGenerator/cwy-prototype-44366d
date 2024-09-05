import React from "react";
import { render, screen } from "@testing-library/react";

import JobApplicationsPage from "../JobApplicationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobApplications page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobApplicationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobApplications-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobApplications-add-button")).toBeInTheDocument();
});
