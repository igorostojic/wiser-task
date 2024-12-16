import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../../test-data/test-data";
import { errorMessages } from "../../support/error-messages";

export class SignUp {
  readonly page: Page;

  /* Sign up page locators */

  readonly input: {
    name: Locator;
    email: Locator;
    password: Locator;
    firstName: Locator;
    lastName: Locator;
    company: Locator;
    address: Locator;
    addressTwo: Locator;
    state: Locator;
    city: Locator;
    zipCode: Locator;
    mobileNumber: Locator;
  };

  readonly radioBtn: {
    mr: Locator;
    mrs: Locator;
  };

  readonly select: {
    day: Locator;
    month: Locator;
    year: Locator;
    country: Locator;
  };

  readonly btn: {
    createAccount: Locator;
    continue: Locator;
  };

  readonly label: {
    accountCreated: Locator;
    congratulationsMsg: Locator;
    confirmationMsg: Locator;
  };

  /* Sign up page constructor */

  constructor(page: Page) {
    this.page = page;

    this.input = {
      name: page.getByTestId("name"),
      email: page.getByTestId("email"),
      password: page.getByTestId("password"),
      firstName: page.getByTestId("first_name"),
      lastName: page.getByTestId("last_name"),
      company: page.getByTestId("company"),
      address: page.getByTestId("address"),
      addressTwo: page.getByTestId("address2"),
      state: page.getByTestId("state"),
      city: page.getByTestId("city"),
      zipCode: page.getByTestId("zipcode"),
      mobileNumber: page.getByTestId("mobile_number"),
    };

    this.radioBtn = {
      mr: page.locator("#id_gender1"),
      mrs: page.locator("#id_gender2"),
    };

    this.select = {
      day: page.getByTestId("days"),
      month: page.getByTestId("months"),
      year: page.getByTestId("years"),
      country: page.getByTestId("country"),
    };

    this.btn = {
      createAccount: page.getByTestId("create-account"),
      continue: page.getByTestId("continue-button"),
    };

    this.label = {
      accountCreated: page.getByTestId("account-created"),
      congratulationsMsg: page.locator("p").first(),
      confirmationMsg: page.locator("p").nth(1),
    };
  }

  /* Sign up page methods */

  async fillInSignUpDetailsAndRegister(name: string, email: string) {
    if (
      !(await this.input.name.inputValue()).match(name) &&
      !(await this.input.email.inputValue()).match(email)
    ) {
      throw Error(errorMessages.signUpDataNotMatching);
    }

    await this.input.password.fill(testData.password);
    await this.select.day.selectOption(testData.selectOption.day);
    await this.select.month.selectOption(testData.selectOption.month);
    await this.select.year.selectOption(testData.selectOption.year);
    await this.input.firstName.fill(testData.firstName);
    await this.input.lastName.fill(testData.lastName);
    await this.input.address.fill(testData.address);
    await this.input.addressTwo.fill(testData.addressTwo);
    await this.select.country.selectOption(testData.selectOption.country);
    await this.input.state.fill(testData.state);
    await this.input.city.fill(testData.city);
    await this.input.zipCode.fill(testData.zipCode);
    await this.input.mobileNumber.fill(testData.mobileNumber);
    await this.btn.createAccount.click();
  }

  async verifySuccessfullRegistration() {
    if (!this.page.url().endsWith("account_created")) {
      throw Error(errorMessages.accountCreatedPage);
    }

    const accountCreated = await this.label.accountCreated.textContent();

    if (!accountCreated?.match(testData.messages.accountCreated)) {
      throw Error(errorMessages.accountNotCreated);
    }

    await expect(this.label.congratulationsMsg).toHaveText(
      testData.messages.congratulations
    );
    await expect(this.label.confirmationMsg).toHaveText(
      testData.messages.confirmation
    );

    await this.btn.continue.click();
  }
}
