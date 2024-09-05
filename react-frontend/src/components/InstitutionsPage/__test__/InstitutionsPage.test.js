import React from "react";
import { render, screen } from "@testing-library/react";

import InstitutionsPage from "../InstitutionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders institutions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InstitutionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("institutions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("institutions-add-button")).toBeInTheDocument();
});
