import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { Login } from "../page-objects/login-page";
import { SignUp } from "../page-objects/sign-up-page";
import RandomData from "../../support/random-data";
import { testData } from "../../test-data/test-data";
import { errorMessages } from "../../support/error-messages";
import { Products } from "../page-objects/products-page";
import { Cart } from "../page-objects/cart-page";

test.describe("Wiser Task", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const homePage = new HomePage(page);

    await page.goto("/");
    await homePage.link.login.click();
    expect(page.url()).toContain(testData.pageLinks.login);

    if (
      testInfo.tags.includes("@addToCart") ||
      testInfo.tags.includes("@logIn")
    ) {
      const login = new Login(page);

      await login.login(testData.username, testData.password);
      await expect(homePage.label.username).toContainText(
        testData.firstName + " " + testData.lastName
      );
    }
  });

  test("Register user", async function ({ page }) {
    const login = new Login(page);
    const signUp = new SignUp(page);
    const homePage = new HomePage(page);
    const randomData = new RandomData();

    const name = randomData.randomName();
    const email = randomData.randomEmailDomain();

    await login.signUp(name, email);
    await signUp.fillInSignUpDetailsAndRegister(name, email);
    await signUp.verifySuccessfullRegistration();

    if (!page.url().match(testData.pageLinks.homePage)) {
      throw Error(errorMessages.homePage);
    }

    await expect(homePage.label.username).toContainText(name);
  });

  test("Add product to cart", { tag: "@addToCart" }, async function ({ page }) {
    const homePage = new HomePage(page);
    const product = new Products(page);
    const cart = new Cart(page);

    await homePage.link.product.click();
    await product.searchForProduct(testData.product.name);
    await product.verifyProperProductIsPresented(
      testData.product.image,
      testData.product.name,
      testData.product.price
    );
    await product.addProductToTheCart(
      testData.product.image,
      testData.product.name,
      testData.product.category,
      testData.product.quantity,
      testData.product.price
    );
    await product.goToCart();

    const priceNumber = Number(testData.product.price.slice(3));
    const quantityNumber = Number(testData.product.quantity);
    const total = priceNumber * quantityNumber;
    const imgAttr = testData.product.image.slice(1);

    await cart.verifyCartItemAddedProperly(
      imgAttr,
      testData.product.name,
      testData.product.category,
      testData.product.price,
      testData.product.quantity,
      total.toString()
    );
  });

  test(
    "Log in and log out with existing account",
    { tag: "@logIn" },
    async function ({ page }) {
      const homePage = new HomePage(page);

      await homePage.link.logOut.click();
      expect(page.url()).toContain(testData.pageLinks.login);
      await expect(homePage.label.username).toBeHidden();
      await expect(homePage.link.login).toBeVisible();
    }
  );

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.tags.includes("@addToCart")) {
      const cart = new Cart(page);

      await cart.tableField.deleteBtn.click();
      await expect(cart.card.emptyCart).toBeVisible();
    }
  });
});
