const request = require("supertest");
const app = require("../app");
const { Artist } = require("../models");

jest.mock("../models", () => ({
  Artist: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  }
}));

describe("Artist Controller Tests", () => {

  test("GET /artists should return all artists", async () => {
    Artist.findAll.mockResolvedValue([
      { id: 1, artistName: "Becky G" },
      { id: 2, artistName: "Karol G" }
    ]);

    const res = await request(app).get("/artists");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(Artist.findAll).toHaveBeenCalled();
  });

  test("GET /artists/:id should return one artist", async () => {
    Artist.findByPk.mockResolvedValue({
      id: 1,
      artistName: "Becky G"
    });

    const res = await request(app).get("/artists/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.artistName).toBe("Becky G");
    expect(Artist.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
  });

  test("POST /artists should create a new artist", async () => {
    Artist.create.mockResolvedValue({
      id: 3,
      artistName: "New Artist"
    });

    const res = await request(app)
      .post("/artists")
      .send({ artistName: "New Artist" });

    expect(res.statusCode).toBe(201);
    expect(res.body.artistName).toBe("New Artist");
    expect(Artist.create).toHaveBeenCalled();
  });

});
