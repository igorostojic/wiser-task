export default class RandomData {
  readonly firstName: string[];
  readonly lastName: string[];
  readonly emailDomain: string[];

  constructor() {
    this.firstName = [
      "Natalia",
      "Francesco",
      "Noah",
      "Darien",
      "Briley",
      "Priscilla",
      "Janelle",
      "Jolie",
      "Kegan",
      "Haily",
      "Jalen",
      "Jamari",
      "Layne",
      "Susanna",
      "Jena",
      "Joselin",
      "Karen",
      "Maiya",
      "Lilliana",
      "Branden",
      "Mohamed",
      "Denzel",
      "Blayne",
      "Alissa",
      "Broderick",
      "Terrell",
      "Ismael",
      "Kristian",
      "Melinda",
      "Edmund",
      "Tristen",
      "Marco",
      "Jeffery",
      "Adeline",
      "Austen",
      "Colin",
      "Lia",
      "Mikaela",
      "Emani",
      "Ariel",
    ];

    this.lastName = [
      "Coates",
      "Whitman",
      "Locklear",
      "Dias",
      "McIntosh",
      "Mahoney",
      "Fanning",
      "Reinhardt",
      "Price",
      "Olivares",
      "Jackson",
      "Brennan",
      "Carman",
      "Angeles",
      "Pino",
      "Rourke",
      "McElroy",
      "Alfaro",
      "Barclay",
      "Seay",
      "Gilbertson",
      "Gunderson",
      "Pringle",
      "Skaggs",
      "McMahan",
      "Vickers",
      "Whiting",
      "Tinsley",
      "Cardona",
      "Lowery",
      "Corbin",
      "Daniels",
      "Hummel",
      "Kirsch",
      "Helms",
      "Esposito",
      "Bianco",
      "Lombardi",
      "Hendrickson",
      "Severson",
    ];

    this.emailDomain = [
      "@yopmail.com",
      "@mailinator.com",
      "@tempmail.com",
      "@sharklasers.com",
    ];
  }

  randomName() {
    const firstNameIndex = Math.floor(Math.random() * this.firstName.length);
    const lastNameIndex = Math.floor(Math.random() * this.lastName.length);
    const firstName = this.firstName[firstNameIndex];
    const lastName = this.lastName[lastNameIndex];

    return firstName + " " + lastName;
  }

  randomEmailDomain() {
    const emailDomainIndex = Math.floor(
      Math.random() * this.emailDomain.length
    );
    const emailDomain = this.emailDomain[emailDomainIndex];

    return this.randomName().replaceAll(" ", "") + emailDomain;
  }
}
