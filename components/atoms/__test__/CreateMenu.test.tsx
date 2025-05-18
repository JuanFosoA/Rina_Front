import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateMenu from "../CreateMenu";
import { router } from "expo-router";

// Mock del router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("CreateMenu", () => {
  it('renders the "+" button', () => {
    const { getByText } = render(<CreateMenu />);
    const plusButton = getByText("+");
    expect(plusButton).toBeTruthy();
  });

  it("renders the Pressable component using testID", () => {
    const { getByTestId } = render(<CreateMenu />);
    const pressable = getByTestId("create-menu-button");
    expect(pressable).toBeTruthy();
  });

  it("has correct styles applied via className", () => {
    const { getByTestId } = render(<CreateMenu />);
    const pressable = getByTestId("create-menu-button");
    expect(pressable.props.className).toContain("absolute bottom-6 right-6");
  });

  it("calls router.push when pressed", () => {
    const { getByTestId } = render(<CreateMenu />);
    const pressable = getByTestId("create-menu-button");
    fireEvent.press(pressable);
    expect(router.push).toHaveBeenCalledWith("(menu)/menu");
  });

  it("renders text with correct className style", () => {
    const { getByText } = render(<CreateMenu />);
    const text = getByText("+");
    expect(text.props.className).toContain("text-white text-3xl");
  });
});
