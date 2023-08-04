import connection from "../configs/connectDB";
const getDetailUserService = async (id) => {
  let userId = id;
  let [rows, fields] = await connection.execute(
    "SELECT * FROM `users` WHERE `userId` = ?",
    [userId]
  );
  return rows[0];
};
module.exports = {
  getDetailUserService,
};
