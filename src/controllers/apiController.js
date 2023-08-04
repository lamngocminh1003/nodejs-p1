import connection from "../configs/connectDB";
let getAllUsers = async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM `users`");
  return res.status(200).json({ message: "ok", data: rows });
};
let createUser = async (req, res) => {
  let { lastName, firstName, email, address } = req.body;
  if (!lastName || !firstName || !email || !address) {
    return res.status(400).json({ message: "missing parameters" });
  }
  await connection.execute(
    "INSERT INTO users (lastName, firstName, email, address) VALUES (?,?,?,?);",
    [lastName, firstName, email, address]
  );
  return res.status(200).json({ message: "ok" });
};
let updateUser = async (req, res) => {
  let { userId, lastName, firstName, email, address } = req.body;
  if (!userId || !lastName || !firstName || !email || !address) {
    return res.status(400).json({ message: "missing parameters" });
  }
  await connection.execute(
    "UPDATE users SET lastName=?, firstName=?, email=?, address=? WHERE userId =? ;",
    [lastName, firstName, email, address, userId]
  );
  return res.status(200).json({ message: "ok" });
};
let deleteUser = async (req, res) => {
  let { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "missing parameters" });
  }
  await connection.execute("DELETE FROM users WHERE userId =? ;", [userId]);
  return res.status(200).json({ message: "ok" });
};
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};
