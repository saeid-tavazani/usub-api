const connection = require("../../database/mysql");

const selectUser = async (value) => {
  const [rows] = await connection.query(
    "SELECT `id`, CONCAT(`first_name`,' ', `last_name`) AS name, `email`, `password`, `role`, `create_at`, `phone`, `status` FROM `users` WHERE `email`=? AND `status`='active' LIMIT 1",
    value
  );
  return rows[0];
};
const selectUserId = async (value) => {
  const [rows] = await connection.query(
    "SELECT `id`, CONCAT(`first_name`,' ', `last_name`) AS name, `email`, `password`, `role`, `create_at`, `phone`, `status` FROM `users` WHERE `status`!='deleted' AND `id`=? LIMIT 1",
    value
  );
  return rows[0];
};
const selectAllUser = async () => {
  const [rows] = await connection.query(
    "SELECT `id`, CONCAT(`first_name`,' ', `last_name`) AS name, `email`, `role`, `create_at`, `phone`, `status` FROM `users` WHERE `status`!='deleted'"
  );
  return rows;
};
const deleteUser = async (id) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `status`='deleted' WHERE `id`=? LIMIT 1",
    id
  );
  return rows;
};
const changeStatus = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `status`=? WHERE `id`=? LIMIT 1",
    value
  );
  return rows;
};
const updateUserInfo = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `first_name`=?,`last_name`=?,`email`=?,`phone`=? WHERE id=? LIMIT 1",
    value
  );
  return rows;
};
const updateUserPassword = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `password`=? WHERE id=? LIMIT 1",
    value
  );
  return rows;
};
const addUser = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `role`,  `phone`) VALUES (?,?,?,?,?,?)",
    value
  );
  return rows;
};

module.exports = {
  selectUser,
  selectAllUser,
  deleteUser,
  changeStatus,
  updateUserInfo,
  updateUserPassword,
  selectUserId,
  addUser,
};
