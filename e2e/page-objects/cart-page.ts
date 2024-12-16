import { expect, Locator, Page } from "@playwright/test";
import { errorMessages } from "../../support/error-messages";

export class Cart {
  readonly page: Page;

  readonly tableField: {
    item: Locator;
    description: Locator;
    price: Locator;
    quantity: Locator;
    total: Locator;
    deleteBtn: Locator;
  };

  readonly card: { emptyCart: Locator };

  constructor(page: Page) {
    this.page = page;

    this.tableField = {
      item: page.locator(".cart_product > a > img"),
      description: page.locator(".cart_description"),
      price: page.locator(".cart_price > p"),
      quantity: page.locator(".cart_quantity > button"),
      total: page.locator(".cart_total_price"),
      deleteBtn: page.locator(".cart_quantity_delete"),
    };

    this.card = { emptyCart: page.locator("#empty_cart") };
  }

  async verifyCartItemAddedProperly(
    image: string,
    productName: string,
    productDescription: string,
    price: string,
    quantity: string,
    total: string
  ) {
    if (await this.card.emptyCart.isVisible()) {
      throw Error(errorMessages.emptyCart);
    }

    await expect(this.tableField.item).toHaveAttribute("src", image);
    await expect(this.tableField.description).toContainText(
      productName || productDescription
    );
    await expect(this.tableField.price).toHaveText(price);
    await expect(this.tableField.quantity).toHaveText(quantity);
    await expect(this.tableField.total).toContainText(total);
  }
}
