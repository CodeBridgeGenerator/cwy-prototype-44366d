import React from "react";
import { render, screen } from "@testing-library/react";

import ScholarshipsCreateDialogComponent from "../ScholarshipsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scholarships create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScholarshipsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scholarships-create-dialog-component")).toBeInTheDocument();
});
