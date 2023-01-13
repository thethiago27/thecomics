import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroBox from ".";

describe("Hero Banner Component", () => {
  it("Should render the Hero Box with comic URL", () => {
    const props = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      description: "description",
      title: "name",
      id: "id",
    };

    render(<HeroBox hero={props} url="comics" />);

    const characterName = screen.getByText(/name/i);
    const comicUrl = screen.getByRole("link");

    expect(characterName).toBeInTheDocument();
    expect(comicUrl).toHaveAttribute("href", "/comics/id");
  });

  it("Should render the Hero Box with character URL", () => {
    const props = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      description: "description",
      title: "name",
      id: "id",
    };

    render(<HeroBox hero={props} url="characters" />);

    const characterName = screen.getByText(/name/i);
    const comicUrl = screen.getByRole("link");

    expect(characterName).toBeInTheDocument();
    expect(comicUrl).toHaveAttribute("href", "/characters/id");
  });
});
