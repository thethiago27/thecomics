import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CharacterImage from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Character Image Component", () => {
  it("Should render the character image", () => {
    const props = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      description: "description",
      name: "name",
      id: "id",
    };

    render(<CharacterImage character={props} />);

    const characterImage = screen.getByRole("img");
    const characterName = screen.getByText(/name/i);

    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute("alt", "name");
    expect(characterName).toBeInTheDocument();
  });
});
