import Navbar from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import exp from "constants";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => {
    return {
      locale: "en",
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };
  }),
}));

describe("Navbar Component", () => {
  it("Should render the Navbar Component", () => {
    render(<Navbar />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("Should render the logo image", () => {
    render(<Navbar />);
    const logo = screen.getByTestId("logo");
    expect(logo).toHaveAttribute("src", "/assets/logo.svg");
  });

  it("Should render the SearchInput Component", () => {
    render(<Navbar />);
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  it("Should render the GithubButton Component", () => {
    render(<Navbar />);
    const githubButton = screen.getByTestId("github-button");
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveTextContent("Github");
  });
});
