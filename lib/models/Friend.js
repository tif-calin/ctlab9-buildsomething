import pool from '../utils/pool.js';

export default class Friend {
  id;
  name;
  birthday;

  constructor (row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.birthday = row.birthday;
  }

  static async insert({ name, birthday }) {
    const { rows } = await pool.query(`
      INSERT INTO friends (name, birthday)
      VALUES ($1, $2)
      RETURNING *;
    `, [name, birthday]);

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
      FROM friends
    `);

    return rows.map(row => new Friend(row));
  }

  static async update({ id, name, birthday }) {
    const { rows } = await pool.query(`
      UPDATE friends
      SET name = $2, birthday = $3
      WHERE id = $1
      RETURNING *;
    `, [id, name, birthday]);

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
