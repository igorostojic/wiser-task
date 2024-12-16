interface TestData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  addressTwo: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
  selectOption: {
    day: string;
    month: string;
    year: string;
    country: string;
  };
  messages: {
    accountCreated: string;
    congratulations: string;
    confirmation: string;
  };
  pageLinks: {
    homePage: string;
    accountCreated: string;
    login: string;
  };
  product: {
    image: string;
    name: string;
    category: string;
    quantity: string;
    price: string;
  };
}

export const testData: TestData = {
  username: "test.automation.one@yopmail.com",
  password: "password123!",
  firstName: "Automation",
  lastName: "User",
  company: "Automation Company",
  address: "Automation Street 123",
  addressTwo: "Automation Street 789",
  state: "Automation State",
  city: "Automation City",
  zipCode: "10000",
  mobileNumber: "+123456789",
  selectOption: {
    day: "10",
    month: "10",
    year: "1996",
    country: "New Zealand",
  },
  messages: {
    accountCreated: "Account Created!",
    congratulations:
      "Congratulations! Your new account has been successfully created!",
    confirmation:
      "You can now take advantage of member privileges to enhance your online shopping experience with us.",
  },
  pageLinks: {
    homePage: "https://automationexercise.com/",
    accountCreated: "/account_created",
    login: "/login",
  },
  product: {
    image: "/get_product_picture/2",
    name: "Men Tshirt",
    category: "Men > Tshirts",
    quantity: "2",
    price: "Rs. 400",
  },
};
