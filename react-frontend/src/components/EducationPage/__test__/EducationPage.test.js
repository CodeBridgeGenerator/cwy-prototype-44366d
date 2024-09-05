import React from "react";
import { render, screen } from "@testing-library/react";

import EducationPage from "../EducationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders education page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EducationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("education-datatable")).toBeInTheDocument();
    expect(screen.getByRole("education-add-button")).toBeInTheDocument();
});
