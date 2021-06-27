import pool from '../utils/pool.js';

export default class Friend {
  id;
  name;
  birthday;
  accountId;

  constructor (row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.birthday = row.birthday;
    this.accountId = row.account_id;
  }

  static async insert({ name, birthday, accountId }) {
    const { rows } = await pool.query(`
      INSERT INTO friends (name, birthday, account_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [name, birthday, accountId]);

    return new Friend(rows[0]);
  }

  static async get(id) {
    const { rows } = await pool.query(`
      SELECT * 
      FROM friends
      WHERE id = $1;
    `, [id]);

    return new Friend(rows[0]);
  }

  static async gather() {
    const { rows } = await pool.query(`
      SELECT *
      FROM friends;
    `);

    return rows.map(row => new Friend(row));
  }

  static async update({ id, name, birthday, accountId }) {
    const { rows } = await pool.query(`
      UPDATE friends
      SET name = $2, birthday = $3, account_id = $4
      WHERE id = $1
      RETURNING *;
    `, [id, name, birthday, accountId]);

    return new Friend(rows[0]);
  }

  static async remove(id) {
    const { rows } = await pool.query(`
      DELETE FROM friends
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Friend(rows[0]);
  }
}
