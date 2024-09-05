import React from "react";
import { render, screen } from "@testing-library/react";

import AdminsPage from "../AdminsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders admins page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AdminsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("admins-datatable")).toBeInTheDocument();
    expect(screen.getByRole("admins-add-button")).toBeInTheDocument();
});
