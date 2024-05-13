import { render, screen } from "@testing-library/react";
import MemberList from "./MemberList";

describe("MemberList component", () => {
  const members = [
    {
      id: 1,
      type: 1,
      experience: 5,
      job: 1,
      age: 30,
      wealth: 100000,
    },
    {
      id: 2,
      type: 2,
      experience: 10,
      job: 2,
      age: 40,
      wealth: 150000,
    },
    {
      id: 3,
      type: 3,
      experience: 0,
      job: 0,
      age: 25,
      wealth: 50000,
    },
  ];

  const handleEditMember = jest.fn();
  const handleDeleteMember = jest.fn();

  test("renders member list correctly", () => {
    render(
      <MemberList
        members={members}
        handleEditMember={handleEditMember}
        handleDeleteMember={handleDeleteMember}
      />
    );

    const memberItems = screen.getAllByRole("listitem");
    expect(memberItems).toHaveLength(members.length);
  });

  test("renders correct member details", () => {
    render(
      <MemberList
        members={members}
        handleEditMember={handleEditMember}
        handleDeleteMember={handleDeleteMember}
      />
    );

    // Verify the rendering of member details for each member
    members.forEach((member) => {
      // Check if the member's age is rendered for type 3
      if (member.type === 3) {
        const age = screen.getByTestId("member-age");
        expect(age).toHaveTextContent(`${member.age}`);
      }
      // Check if the member's wealth is rendered for type 3
      if (member.type === 3) {
        const wealth = screen.getByTestId("member-wealth");
        expect(wealth).toHaveTextContent(`${member.wealth}`);
      }
    });
  });
});
