import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGithub from "./index";

describe("Github Button Component", () => {
  it("Should render the Github Button", () => {
    render(<ButtonGithub />);

    expect(screen.getByText(/Github/i)).toBeInTheDocument();
  });
});
