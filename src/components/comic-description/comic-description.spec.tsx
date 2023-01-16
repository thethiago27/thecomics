import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ComicDescription from "./index";

describe("Comic Description Component", () => {
  it("Should render the comic description", () => {
    const props = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      description: "description",
      title: "name",
      id: "id",
    };

    render(<ComicDescription comic={props} />);

    const comicImage = screen.getByRole("img");
    const comicTitle = screen.getByText(/name/i);
    const comicDescription = screen.getByText(/description/i);

    expect(comicImage).toBeInTheDocument();
    expect(comicImage).toHaveAttribute("alt", "name");

    expect(comicTitle).toBeInTheDocument();
    expect(comicDescription).toBeInTheDocument();
  });

  it("Should render the comic description without description", () => {
    const props = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      description: "",
      title: "name",
      id: "id",
    };

    render(<ComicDescription comic={props} />);

    const comicImage = screen.getByRole("img");
    const comicTitle = screen.getByText(/name/i);
    const comicDescription = screen.getByText(/No description available/i);

    expect(comicImage).toBeInTheDocument();
    expect(comicImage).toHaveAttribute("alt", "name");

    expect(comicTitle).toBeInTheDocument();
    expect(comicDescription).toBeInTheDocument();
  });
});
