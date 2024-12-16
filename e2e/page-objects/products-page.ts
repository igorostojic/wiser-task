import { expect, Locator, Page } from "@playwright/test";
import { errorMessages } from "../../support/error-messages";

export class Products {
  readonly page: Page;

  readonly input: {
    search: Locator;
    quantity: Locator;
  };

  readonly btn: {
    submitSearch: Locator;
    viewProduct: Locator;
    addToCart: Locator;
  };

  readonly card: {
    products: Locator;
    image: Locator;
    productName: Locator;
    productPrice: Locator;
  };
  readonly link: { viewCart: Locator };
  readonly img: { productImg: Locator };

  readonly label: {
    productName: Locator;
    productCategory: Locator;
    price: Locator;
  };

  readonly modal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = {
      search: page.locator("#search_product"),
      quantity: page.locator("#quantity"),
    };

    this.btn = {
      submitSearch: page.locator("#submit_search"),
      viewProduct: page.getByText("View Product"),
      addToCart: page.getByRole("button", { name: "Add to cart" }),
    };

    this.card = {
      products: page.locator(".single-products"),
      image: page.locator(".productinfo > img"),
      productName: page.locator(".productinfo > p"),
      productPrice: page.locator(".productinfo > h2"),
    };

    this.link = { viewCart: page.getByText("View Cart") };
    this.img = { productImg: page.locator(".view-product > img") };

    this.label = {
      productName: page.locator(".product-information > h2"),
      productCategory: page.locator(".product-information > h2 + p"),
      price: page.locator(".product-information > span > span"),
    };

    this.modal = page.locator("#cartModal");
  }

  async searchForProduct(productName: string) {
    await this.input.search.fill(productName);
    await this.btn.submitSearch.click();
  }

  async verifyProperProductIsPresented(
    image: string,
    productName: string,
    price: string
  ) {
    await expect(this.card.image.first()).toHaveAttribute("src", image);
    await expect(this.card.productName).toHaveText(productName);
    await expect(this.card.productPrice).toHaveText(price);

    if ((await this.card.products.all()).length != 1) {
      throw Error(errorMessages.searchWrong);
    }
  }

  async addProductToTheCart(
    image: string,
    productName: string,
    category: string,
    quantity: string,
    price: string
  ) {
    await this.btn.viewProduct.click();
    await this.input.quantity.clear();
    await this.input.quantity.fill(quantity);

    await expect(this.img.productImg).toHaveAttribute("src", image);
    await expect(this.label.productName).toHaveText(productName);
    await expect(this.label.productCategory).toContainText(category);
    await expect(this.label.price).toHaveText(price);

    await this.btn.addToCart.click();
  }

  async goToCart() {
    await expect(this.modal).toBeVisible();
    await this.link.viewCart.click();
  }
}
