import React from "react";
import { render, screen } from "@testing-library/react";

import InstitutionsEditDialogComponent from "../InstitutionsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders institutions edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InstitutionsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("institutions-edit-dialog-component")).toBeInTheDocument();
});
