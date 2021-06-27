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

  test('add a friend via POST', async () => {
    const res = await request(app)
      .post('/api/v1/friends')
      .send(cami)
    ;

    expect(res.body).toEqual({
      ...cami,
      id: '1'
    });
  });

  test('get a friend by id via GET', async () => {

  });

  test('get all friends via GET', async () => {

  });

  test('modify a friend via PUT', async () => {

  });

  test('remove a friend via DELETE', async () => {

  });
});
