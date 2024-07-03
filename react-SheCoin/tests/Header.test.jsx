import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import { describe, it, expect } from "vitest";

describe("Header Component", () => {
	it("should match the snapshot", () => {
		const { asFragment } = render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
