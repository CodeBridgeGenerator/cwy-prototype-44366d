import React from "react";
import { render, screen } from "@testing-library/react";

import MemberInstitutionsEditDialogComponent from "../MemberInstitutionsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memberInstitutions edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemberInstitutionsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memberInstitutions-edit-dialog-component")).toBeInTheDocument();
});
