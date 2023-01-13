import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from ".";
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  })),
}));

describe("Layout Component", () => {
  it("Should render the Container Component", () => {
    render(<Layout>Test</Layout>);

    const container = screen.getByTestId("layout");

    expect(container).toBeInTheDocument();
  });

  it("Should render the Container Component with children", () => {
    render(<Layout>Test</Layout>);

    const container = screen.getByTestId("layout");
    const children = screen.getByText(/Test/i);

    expect(container).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });
});
