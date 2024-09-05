import React from "react";
import { render, screen } from "@testing-library/react";

import MemberInstitutionsPage from "../MemberInstitutionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memberInstitutions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemberInstitutionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memberInstitutions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memberInstitutions-add-button")).toBeInTheDocument();
});
