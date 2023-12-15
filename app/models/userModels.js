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

const addPeple = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `contact`(`user_id`, `name`, `type`,category) VALUES (?,?,?,'contact')",
    value
  );
  return rows;
};

const people = async (value) => {
  const [rows] = await connection.query(
    "SELECT transaction.id AS transactionId, transaction.title, SUM(transaction.amount) AS totalSum, transaction.date, transaction.type ,contact.id , contact.name AS personName ,contact.type AS personType ,contact.remained FROM `contact` INNER JOIN `users` ON users.id = contact.user_id LEFT JOIN `transaction` ON contact.id = transaction.usub_id WHERE users.id =? AND contact.category='contact'",
    value
  );
  return rows;
};

const addList = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `contact`(`user_id`, `name`,remained,category) VALUES (?,?,?,'list')",
    value
  );
  return rows;
};

const list = async (value) => {
  const [rows] = await connection.query(
    "SELECT transaction.id AS transactionId, transaction.title, SUM(transaction.amount) AS totalSum, transaction.date ,contact.id , contact.name AS personName ,contact.type AS personType ,contact.remained FROM `contact` INNER JOIN `users` ON users.id = contact.user_id LEFT JOIN `transaction` ON contact.id = transaction.usub_id WHERE users.id =? AND contact.category='list'",
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
  addPeple,
  people,
  addList,
  list,
};
