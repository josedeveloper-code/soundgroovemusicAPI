const request = require("supertest");
const app = require("../app"); // FIXED: import app.js, not server.js
const { Track, Artist } = require("../models");

// Mock Sequelize models
jest.mock("../models", () => ({
  Track: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  },
  Artist: {
    findByPk: jest.fn()
  }
}));

describe("Track Controller Tests", () => {

  test("GET /tracks should return all tracks", async () => {
    Track.findAll.mockResolvedValue([
      { id: 1, title: "Song A", artistId: 1 },
      { id: 2, title: "Song B", artistId: 2 }
    ]);

    const res = await request(app).get("/tracks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(Track.findAll).toHaveBeenCalled();
  });

  test("GET /tracks/:id should return one track", async () => {
    Track.findByPk.mockResolvedValue({
      id: 1,
      title: "Song A",
      artistId: 1
    });

    const res = await request(app).get("/tracks/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Song A");
    expect(Track.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
  });

  test("POST /tracks should create a new track", async () => {
    Artist.findByPk.mockResolvedValue({ id: 1, artistName: "Becky G" });

    Track.create.mockResolvedValue({
      id: 3,
      title: "New Track",
      artistId: 1
    });

    const res = await request(app)
      .post("/tracks")
      .send({
        title: "New Track",
        artistId: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Track");
    expect(Track.create).toHaveBeenCalled();
  });

});
