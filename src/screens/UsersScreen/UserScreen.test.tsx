import { render, screen, waitFor } from "@testing-library/react";
import { UsersScreen } from "./UserScreen";
import { server } from "../../mocks/server"
import { rest } from "msw";

describe("UserScreen", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      }
  })
  });

  test("Renders users when API call succeeds", async () => {
    render(<UsersScreen />);
    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument()
    })
    const userCards = await screen.findAllByLabelText("user-card") 
    expect(userCards).toHaveLength(3)
  });

  test("Renders error when API call fails", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
        return res(
          ctx.status(500)
        );
      }),
    )

    render(<UsersScreen />);
    const userCards = await screen.findByText("Oooops! Something went wrong. Please try again later.") 
    expect(userCards).toBeInTheDocument()
  });
});
