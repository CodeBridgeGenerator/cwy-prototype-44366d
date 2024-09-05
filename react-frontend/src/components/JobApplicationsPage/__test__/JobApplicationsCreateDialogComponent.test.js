import React from "react";
import { render, screen } from "@testing-library/react";

import JobApplicationsCreateDialogComponent from "../JobApplicationsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobApplications create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobApplicationsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobApplications-create-dialog-component")).toBeInTheDocument();
});
