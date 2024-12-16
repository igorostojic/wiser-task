import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  readonly link: {
    login: Locator;
    cart: Locator;
    product: Locator;
    logOut: Locator;
    deleteAccount: Locator;
  };

  readonly btn: { consent: Locator };
  readonly label: { username: Locator };

  constructor(page: Page) {
    this.page = page;

    this.link = {
      login: page.locator('a[href="/login"]'),
      cart: page.locator('a[href="/view_cart"]'),
      product: page.locator('a[href="/products"]'),
      logOut: page.locator('a[href="/logout"]'),
      deleteAccount: page.locator('a[href="/delete_account"]'),
    };

    this.btn = { consent: page.locator('[aria-label="Consent"]') };
    this.label = { username: page.locator("a > b") };
  }
}
