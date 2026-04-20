const request = require("supertest");
const app = require("../app");
const { Users } = require("../models");

// Mock Sequelize User model
jest.mock("../models", () => ({
  Users: {
    create: jest.fn(),
    findOne: jest.fn()
  }
}));

describe("User Controller Tests", () => {

  // REGISTER TEST
  test("POST /users/register should create a new user", async () => {
    Users.findOne.mockResolvedValue(null); // email not taken

    Users.create.mockResolvedValue({
      id: 1,
      username: "Jose",
      email: "jose@example.com",
      role: "listener"
    });

    const res = await request(app)
      .post("/users/register")
      .send({
        username: "Jose",
        email: "jose@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("jose@example.com");
    expect(Users.create).toHaveBeenCalled();
  });

  // LOGIN TEST
  test("POST /users/login should return a token", async () => {
    Users.findOne.mockResolvedValue({
      id: 1,
      email: "jose@example.com",
      password: "$2a$10$hashedpassword",
      role: "listener"
    });

    // Mock bcrypt.compare
    jest.spyOn(require("bcryptjs"), "compare").mockResolvedValue(true);

    const res = await request(app)
      .post("/users/login")
      .send({
        email: "jose@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // /ME TEST
  test("GET /users/me should return user info when token is valid", async () => {
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { id: 1, role: "listener" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBe(1);
  });

});
