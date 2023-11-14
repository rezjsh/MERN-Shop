import bcrypt from "bcryptjs";

const users = [
  {
    name: "reza",
    email: "reza@example.com",
    isAdmin: true,
    password: bcrypt.hashSync("123456"),
  },
  {
    name: "hamid",
    email: "hamid@example.com",
    isAdmin: false,
    password: bcrypt.hashSync("123456"),
  },
  {
    name: "ali",
    email: "ali@example.com",
    isAdmin: false,
    password: bcrypt.hashSync("123456"),
  },
];

export default users;
