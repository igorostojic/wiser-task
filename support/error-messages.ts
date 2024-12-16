interface ErrorMessages {
  homePage: string;
  signUpDataNotMatching: string;
  accountCreatedPage: string;
  accountNotCreated: string;
  searchWrong: string;
  cartModalMissing: string;
  emptyCart: string;
}

export const errorMessages: ErrorMessages = {
  homePage: "User not redirected to home page.",
  signUpDataNotMatching:
    "Sign up name and email do not match with the data in the accorgin inputs.",
  accountCreatedPage: "User not redirected to account created page.",
  accountNotCreated: "Account not created properly.",
  searchWrong: "Number of shown products doesn't equal product search.",
  cartModalMissing: "Cart confirmation modal is missing.",
  emptyCart: "Cart is empty and no product is added.",
};
