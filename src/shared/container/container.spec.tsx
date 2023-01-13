import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Comic Description Component", () => {
  it("Should render the Container Component", () => {
    render(<Container>Test</Container>);

    const container = screen.getByTestId("container");

    expect(container).toBeInTheDocument();
  });
});
