import React from "react";
import { render, screen } from "@testing-library/react";

import MemberProfilePage from "../MemberProfilePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memberProfile page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemberProfilePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memberProfile-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memberProfile-add-button")).toBeInTheDocument();
});
