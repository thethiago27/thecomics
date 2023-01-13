import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroBanner from ".";

describe("Hero Banner Component", () => {
  it("Should render the Hero Banner", () => {
    const props = {
      title: "title",
      id: "id",
    };

    render(<HeroBanner hero={props} />);

    const characterName = screen.getByText(/title/i);

    expect(characterName).toBeInTheDocument();
  });
});
