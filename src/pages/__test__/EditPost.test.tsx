import { expect, test } from "vitest";

// specifically testing for React
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

// component
import EditPost from "../EditPost";

describe("EditPost component📝", () => {
  // 1
  test("renders the Title input", () => {
    render(
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>,
    );
    const inputElement = screen.getByPlaceholderText(/type the title/i);
    expect(inputElement).toBeTruthy();

    expect(inputElement.classList.contains("inputPost__input--small")).toBe(
      true,
    );
  });

  // 2
  test("allows users to input the title", async () => {
    render(
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>,
    );
    const user = userEvent.setup();

    const inputElement = screen.getByPlaceholderText(
      /type the title/i,
    ) as HTMLInputElement; // Type assertion

    // user event (// 機械による入力)
    await user.type(inputElement, "Typed Title");

    // 正しく入力されたか確認
    expect(inputElement.value).toBe("Typed Title"); // Directly checking the value
  });
});
