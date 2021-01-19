const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }

  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    if (id) {
      const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id, 10)}`;
      const res = await this.run(query);
      return res;
    }
    throw new Error(`${id}: This does not looks like id`);
  }

  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error(`${fields} This does not looks like valid fields`);
    }
    const columns = Object.keys(fields);
    const values = Object.values(fields);
    const query = `INSERT INTO ${this.name} (${columns.join(
      ","
    )}) VALUES (${values.map((value) => `'${value}'`).join(",")})`;

    const res = await this.run(query);
    return res;
  }
}

module.exports = Model;
