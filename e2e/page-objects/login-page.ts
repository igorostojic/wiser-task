import { Locator, Page } from "@playwright/test";

export class Login {
  readonly page: Page;

  /* Login page locators */

  readonly input: {
    loginEmail: Locator;
    password: Locator;
    name: Locator;
    signUpEmail: Locator;
  };

  readonly btn: {
    login: Locator;
    signUp: Locator;
  };

  /* Login page constructor */

  constructor(page: Page) {
    this.page = page;

    this.input = {
      loginEmail: page.getByTestId("login-email"),
      password: page.getByTestId("login-password"),
      name: page.getByTestId("signup-name"),
      signUpEmail: page.getByTestId("signup-email"),
    };

    this.btn = {
      login: page.getByTestId("login-button"),
      signUp: page.getByTestId("signup-button"),
    };
  }

  /* Login page methods */

  async login(username: string, password: string) {
    await this.input.loginEmail.fill(username);
    await this.input.password.fill(password);
    await this.btn.login.click();
  }

  async signUp(name: string, signUpEmail: string) {
    await this.input.name.fill(name);
    await this.input.signUpEmail.fill(signUpEmail);
    await this.btn.signUp.click();
  }
}
