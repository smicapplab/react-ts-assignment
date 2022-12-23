import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";

interface userType {
  [key: string]: string;
}

const user: userType = {
  name: "Clementine Bauch",
  email: "Nathan@yesenia.net",
  phone: "1-463-123-4447",
  website: "ramiro.info",
};

const username = "Samantha"

test("User Card renders correctly", () => {
  const { name, email, phone, website } = user;
  render(
    <UserCard title="user-card"
      name={name}
      username={username}
      email={email}
      phone={phone}
      website={website}
    />
  );

  Object.keys(user).forEach((k: string) => {
    const displayElem = screen.getByText(user[k]);
    expect(displayElem).toBeInTheDocument();
  });

  const avatarImage = screen.getByAltText(username) 
  expect(avatarImage).toHaveAttribute('src', `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`)

  const heartElem = screen.getByTitle("heart")
  expect(heartElem.classList.toString()).toContain("anticon anticon-heart");

  const editElem = screen.getByTitle("edit")
  expect(editElem.classList.toString()).toContain("anticon anticon-edit");

  const deleteElem = screen.getByTitle("delete")
  expect(deleteElem.classList.toString()).toContain("anticon anticon-delete");
});
