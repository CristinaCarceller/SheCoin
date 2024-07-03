import React from "react";
import { render } from "@testing-library/react";
import Footer from "../src/components/Footer.jsx";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
	it("should match the snapshot", () => {
		const { asFragment } = render(<Footer />);
		expect(asFragment()).toMatchSnapshot();
	});
});
