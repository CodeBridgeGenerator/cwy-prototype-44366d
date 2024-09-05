import React from "react";
import { render, screen } from "@testing-library/react";

import JobsPage from "../JobsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobs page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobs-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobs-add-button")).toBeInTheDocument();
});
