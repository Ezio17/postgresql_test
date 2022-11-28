const db = require("../bd");

class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newPerson = await db.query(
      "INSERT INTO person (name, surname) values ($1, $2) RETURNING *",
      [name, surname]
    );

    res.json(newPerson.rows[0]);
  }
  async getUsers(req, res) {
    const getAllPersons = await db.query("SELECT * FROM person");

    res.json(getAllPersons.rows);
  }
  async getOneUser(req, res) {
    const { id } = req.params;
    const getUser = await db.query("SELECT * FROM person where id = $1", [id]);

    res.json(getUser.rows[0]);
  }
  async updateUser(req, res) {
    const { id } = req.params;
    const { name, surname } = req.body;

    const user = await db.query(
      "UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *",
      [name, surname, id]
    );

    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const { id } = req.params;

    const user = await db.query(
      "DELETE FROM person where id = $1",
      [id]
    );

    res.json('success');
  }
}

module.exports = new UserController();
