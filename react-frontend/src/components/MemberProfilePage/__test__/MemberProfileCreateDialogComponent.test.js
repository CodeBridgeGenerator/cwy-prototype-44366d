import React from "react";
import { render, screen } from "@testing-library/react";

import MemberProfileCreateDialogComponent from "../MemberProfileCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memberProfile create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemberProfileCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memberProfile-create-dialog-component")).toBeInTheDocument();
});
