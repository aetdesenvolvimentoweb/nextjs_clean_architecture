import Home from "@/app/(home)/page";
import { render, screen } from "@testing-library/react";

describe("Page Home", () => {
  test("should render a heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Clean Architecture" })
    ).toBeInTheDocument();
  });
});
