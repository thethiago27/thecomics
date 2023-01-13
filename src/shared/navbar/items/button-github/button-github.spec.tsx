import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ButtonGithub from "./";

describe("Github Button Component", () => {
  it("Should render the Github Button", () => {
    render(<ButtonGithub />);

    expect(screen.getByText(/Github/i)).toBeInTheDocument();
  });
});
