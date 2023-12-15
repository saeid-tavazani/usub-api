const connection = require("../../database/mysql");

const selectUserEmail = async (value) => {
  const [rows] = await connection.query(
    "SELECT `id`, name, `email`, `password`, `create_at`, `phone` FROM `users` WHERE `email`=? LIMIT 1",
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
    "SELECT id FROM `users` WHERE `email`=? OR phone=? LIMIT 1",
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

const addpeople = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `contact`(`user_id`, `name`, `type`,category) VALUES (?,?,?,'contact')",
    value
  );
  return rows;
};

const people = async (value) => {
  const [rows] = await connection.query(
    "SELECT t.id transactionId, t.title, SUM(t.amount) totalSum, t.date, t.type, c.id, c.name AS personName, c.type AS personType, c.remained FROM `users` u INNER JOIN `contact` c ON u.id = c.user_id LEFT JOIN `transaction` t ON c.id = t.usub_id WHERE u.id = 10 AND c.category = 'contact' GROUP BY c.id ,t.id;",
    value
  );
  return rows;
};

const addList = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `contact`(`user_id`, `name`,category) VALUES (?,?,'list')",
    value
  );
  return rows;
};

const list = async (value) => {
  const [rows] = await connection.query(
    "SELECT t.id transactionId, t.title, SUM(t.amount) totalSum, t.date, t.type, c.id, c.name AS personName, c.remained FROM `users` u INNER JOIN `contact` c ON u.id = c.user_id LEFT JOIN `transaction` t ON c.id = t.usub_id WHERE u.id = 10 AND c.category = 'list' GROUP BY c.id ,t.id;",
    value
  );
  return rows;
};

const addTransaction = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `transaction`(`usub_id`, `title`, `amount`, `date`, `type`) VALUES (?,?,?,?,?)",
    value
  );
  return rows;
};

module.exports = {
  selectUserEmail,
  newUser,
  selectuser,
  updateUser,
  selectUserId,
  addpeople,
  people,
  addList,
  list,
  addTransaction,
};
