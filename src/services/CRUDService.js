import connection from "../configs/connectDB";
const getDetailUserService = async (id) => {
  let userId = id;
  let [rows, fields] = await connection.execute(
    "SELECT * FROM `users` WHERE `userId` = ?",
    [userId]
  );
  return rows[0];
};
const getAllUsers = async () => {
  let [rows, fields] = await connection.execute("SELECT * FROM `users`");
  return rows;
};
const createUserService = async (data) => {
  let { lastName, firstName, email, address } = data;
  let result = await connection.execute(
    "INSERT INTO users (lastName, firstName, email, address) VALUES (?,?,?,?);",
    [lastName, firstName, email, address]
  );
  return result;
};
const updateUserService = async (data) => {
  let { userId, lastName, firstName, email, address } = data;
  let result = await connection.execute(
    "UPDATE users SET lastName=?, firstName=?, email=?, address=? WHERE userId =? ;",
    [lastName, firstName, email, address, userId]
  );
  return result;
};
module.exports = {
  getDetailUserService,
  getAllUsers,
  createUserService,
  updateUserService,
};
