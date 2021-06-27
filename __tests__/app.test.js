import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Friend from '../lib/models/Friend.js';

describe('friends routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const cami = {
    name: 'Chamomile',
    birthday: '2020-05-13'
  };

  const noodle = {
    name: 'Noodle',
    birthday: '2019-11-03'
  };

  test('add a friend via POST', async () => {
    const res = await request(app)
      .post('/api/v1/friends')
      .send(cami)
    ;

    expect(res.body).toEqual({
      ...cami,
      id: expect.any(Number)
    });
  });

  test('get a friend by id via GET', async () => {
    await Friend.insert(cami);

    const res = await request(app).get('/api/v1/friends/1');

    expect(res.body).toEqual({
      ...cami,
      id: expect.any(Number)
    });
  });

  test('get all friends via GET', async () => {
    await Friend.insert(cami);
    await Friend.insert(noodle);

    const res = await request(app).get('/api/v1/friends/');

    expect(res.body).toEqual([
      {
        ...cami,
        id: expect.any(Number)
      },
      {
        ...noodle,
        id: expect.any(Number)
      }
    ]);
  });

  test('modify a friend via PUT', async () => {
    await Friend.insert(cami);

    const res = await request(app)
      .put('/api/v1/friends/1')
      .send({ ...cami, id: 1, name: 'Cami' })
    ;

    expect(res.body.name).toEqual('Cami');
  });

  test('remove a friend via DELETE', async () => {
    await Friend.insert(cami);

    const res = await request(app).delete('/api/v1/friends/1');

    expect(res.body).toEqual({ ...cami, id: 1 });
    
    const res2 = await request(app).get('/api/v1/friends/');

    expect(res2.body).not.toEqual(expect.arrayContaining([res]));
  });
});
