const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "test",
});

function getConnection() {
  return connection;
}

const createUser = async (user) => {
  try {
    const conn = await getConnection();
    const result = await conn.query("INSERT INTO USER SET ?", user);

    // Return the created Product
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * from USER ORDER BY id DESC");
  return results;
};

const getProductById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM USER WHERE id = ?", id);
  return result[0];
};

const updateUser = async (id, user) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE USER SET ? WHERE Id = ?", [user, id]);
  console.log(result);
};

const deleteUser = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM USER WHERE id = ?", id);
  return result;
};

module.exports = {
  createUser,
  getUsers,
  getProductById,
  updateUser,
  deleteUser,
};
