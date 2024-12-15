import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import Product from "../Product";

test("renders the product name", async () => {
  render(<Product />);
  const productName = screen.getByText("Classy Modern Smart Watch");

  expect(productName).toBeInTheDocument();

  const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });

  const quantityInput = screen.getByTestId("quantity-input");

  const increaseQuantity = screen.getByTestId("increase-quantity");

  // typing in the quantity input
  await userEvent.type(quantityInput, "10");

  // clicking the increase quantity button
  await userEvent.click(increaseQuantity);

  expect(quantityInput).toHaveValue(11);

  await userEvent.click(addToCartButton);

  const cartItem = screen.getByText("Classy Modern Smart Watch");

  expect(cartItem).toBeInTheDocument();
});
