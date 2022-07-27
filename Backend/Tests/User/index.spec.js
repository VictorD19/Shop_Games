const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const { User } = require("../../DB");
describe("Create User", () => {
  it("Check if email is empty", async () => {
    const userTest = { email: "" };
    const res = await request(app).post("/newuser").send(userTest);
    expect(res.body.error).toBe("Email não pode ser nulo");
  });
  it("Check if password is empty", async () => {
    const userTest = { email: "test@test.com", password: "" };
    const res = await request(app).post("/newuser").send(userTest);
    expect(res.body.error).toBe("Password  não pode ser nulo");
  });
  it("Check if the user exists", async () => {
    const email = "test@test.com";
    const findUser = await User.findOne({ email });
    expect(findUser).toHaveProperty("email");
  });
  it("Check that the user does not exist", async () => {
    const email = "test1@test.com";
    const findUser = await User.findOne({ email });
    expect(findUser).toBe(null);
  });
  it("User creation successful!", async () => {
    const userTest = { email: "test1@test.com", password: "123456789" };
    const res = await request(app).post("/newuser").send(userTest);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });
});

describe("Login User", () => {
  it("Check if email is empty", async () => {
    const userTest = { email: "" };
    const res = await request(app).post("/login").send(userTest);
    expect(res.body.error).toBe("Precisa informar um email!");
  });
  it("Check that the email format is valid", async () => {
    const userTest = { email: "testtestm", password: "123456789" };
    const res = await request(app).post("/login").send(userTest);
    expect(res.body.error).toBe("Formato de email invalido!");
  });
  it("Check if the password format is empty", async () => {
    const test = { email: "test@test.com", password: "" };
    const res = await request(app).post("/login").send(test);
    expect(res.body.error).toBe("Precisa informar uma senha!");
  });

  it("Check that the user does not exist", async () => {
    const test = { email: "test12@test.com", password: "123456789" };
    const res = await request(app).post("/login").send(test);
    expect(res.body.error).toBe("Usuario não encontrado!");
  });
  it("check if the password is incorrect", async () => {
    const test = { email: "test@test.com", password: "1234567" };
    const res = await request(app).post("/login").send(test);
    expect(res.body.error).toBe("Senha incorrecta!");
  });
  it("Login successfully", async () => {
    const test = { email: "test1@test.com", password: "123456789" };
    const res = await request(app).post("/login").send(test);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });
});
afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.disconnect();
});
