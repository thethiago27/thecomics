import CharactersDetails from "./[id]";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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

describe("Characters Details Page", () => {
  it("Should render the Characters Details Page", () => {
    const character = {
      id: "12323",
      name: "Thiago Rodrigues",
      description: "Thiago Rodrigues is a developer",
      thumbnail: {
        path: "https://thiagorsouza.xyz",
        extension: "jpg",
      },
    };

    const comics = [
      {
        id: "1",
        title: "Comic 1",
        description: "Comic 1 description",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73",
          extension: "jpg",
        },
      },
    ];

    render(<CharactersDetails character={character} comics={comics} />);

    expect(screen.getByText(/Thiago Rodrigues/i)).toBeInTheDocument();

    expect(screen.getByText(/Comic 1/i)).toBeInTheDocument();
  });
});
