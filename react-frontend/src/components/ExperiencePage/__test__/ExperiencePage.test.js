import React from "react";
import { render, screen } from "@testing-library/react";

import ExperiencePage from "../ExperiencePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders experience page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExperiencePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("experience-datatable")).toBeInTheDocument();
    expect(screen.getByRole("experience-add-button")).toBeInTheDocument();
});
