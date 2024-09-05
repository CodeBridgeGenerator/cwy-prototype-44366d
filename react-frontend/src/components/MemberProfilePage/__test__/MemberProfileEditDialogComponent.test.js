import React from "react";
import { render, screen } from "@testing-library/react";

import MemberProfileEditDialogComponent from "../MemberProfileEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memberProfile edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemberProfileEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memberProfile-edit-dialog-component")).toBeInTheDocument();
});
