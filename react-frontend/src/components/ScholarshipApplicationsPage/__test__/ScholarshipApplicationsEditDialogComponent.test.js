import React from "react";
import { render, screen } from "@testing-library/react";

import ScholarshipApplicationsEditDialogComponent from "../ScholarshipApplicationsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scholarshipApplications edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScholarshipApplicationsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scholarshipApplications-edit-dialog-component")).toBeInTheDocument();
});
