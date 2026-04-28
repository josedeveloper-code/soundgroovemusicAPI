const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');

let artistToken;
let createdArtistId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app)
    .post('/auth/register')
    .send({
      username: 'track-artist',
      email: 'track-artist@groove.com',
      password: 'password123',
      role: 'artist'
    });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({ email: 'track-artist@groove.com', password: 'password123' });

  artistToken = loginRes.body.token;

  const artistRes = await request(app)
    .post('/artist')
    .set('Authorization', `Bearer ${artistToken}`)
    .send({ artistName: 'Track Artist', genre: 'pop', bio: 'Some bio' });

  createdArtistId = artistRes.body.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Track Resource', () => {
  it('rejects unauthenticated track creation', async () => {
    const res = await request(app)
      .post('/tracks')
      .send({ title: 'Solo Song', audioUrl: 'https://audio.example/song.mp3', genre: 'pop', artistId: createdArtistId });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toMatch(/No Token Provided/);
  });

  it('allows an artist to create a new track', async () => {
    const res = await request(app)
      .post('/tracks')
      .set('Authorization', `Bearer ${artistToken}`)
      .send({
        title: 'New Hit',
        audioUrl: 'https://audio.example/new-hit.mp3',
        duration: 210,
        genre: 'pop',
        artistId: createdArtistId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('New Hit');
  });
});
