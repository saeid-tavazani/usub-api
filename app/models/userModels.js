const connection = require("../../database/mysql");

const selectUserActive = async (value) => {
  const [rows] = await connection.query(
    "SELECT `id`, name, `email`, `password`, `role`, `create_at`, `phone`, `status` FROM `users` WHERE `email`=? AND `status`='active' LIMIT 1",
    value
  );
  return rows[0];
};

const newUser = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `users`(`name`, `email`, `password`, `phone`) VALUES (?,?,?,?)",
    value
  );
  return rows;
};

const selectuser = async (value) => {
  const [rows] = await connection.query(
    "SELECT id FROM `users` WHERE `email`=? OR phone=? AND `status`='active' LIMIT 1",
    value
  );
  return rows[0];
};

const selectUserId = async (value) => {
  const [rows] = await connection.query(
    "SELECT * FROM `users` WHERE id=? LIMIT 1",
    value
  );
  return rows[0];
};

const updateUser = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `name`=?,`email`=?,`phone`=? WHERE id=?",
    value
  );
  return rows;
};

const addPeple = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `people`(`user_id`, `name`, `type`) VALUES (?,?,?)",
    value
  );
  return rows;
};

const people = async (value) => {
  const [rows] = await connection.query(
    "SELECT people.name ,people.type FROM `people` INNER JOIN users ON users.id = people.user_id WHERE id =?",
    value
  );
  return rows;
};

module.exports = {
  selectUserActive,
  newUser,
  selectuser,
  updateUser,
  selectUserId,
  addPeple,
  people,
};
