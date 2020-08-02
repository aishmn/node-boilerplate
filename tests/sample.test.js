const { expect } = require("chai");
describe("test", function () {
  it("should check if number is a number", () => {
    expect(1).to.be.a("number");
    expect("2").to.be.a("string");
  });
});
