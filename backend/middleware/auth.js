
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const sequelize = require("../config/index");
const { log } = require("console");



// const authenticateUser = async (req, res, next) => {
//   // Extract token from the request header
//    const token = req.headers.authorization.split(" ")[1];

//   //  const token = req.headers['authorization'];
//    console.log(token)
//   //log(token);

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: Missing token" });
//   }

//   // const bear = token.split(" ");
//   // console.log(bear[1])

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded)

//     // Check if the user exists in the database
//     const existingUser = await sequelize.query(
//       `SELECT email FROM User WHERE id = '${decoded.userId}'`,
//       { type: QueryTypes.SELECT }
//     );

//     if (existingUser.length === 0) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     // Attach user information to the request object
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// };

//Kunal
const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (typeof token == 'undefined') {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }
  const rawToken = token.split(" ")[1]

  const key = req.query.key;
  console.log(key)
  try {
    // Verify the token
    const decoded = jwt.verify(key, process.env.JWT_SECRET);
    //console.log(decoded)

    // Check if the user exists in the database
    const existingUser = await sequelize.query(
      `SELECT email FROM User WHERE id = '${decoded.userId}'`,
      { type: QueryTypes.SELECT }
    );

    if (existingUser.length === 0) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  // if (!token) {
  //   return res.status(401).json({ error: "Unauthorized: Missing token" });
  // }


  // const bear = token.split(" ");
  // console.log(bear[1])


};

module.exports = authenticateUser;