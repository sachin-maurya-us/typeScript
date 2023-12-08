import jwt from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;

const generateToken = (userId: string) => new Promise((resolve, reject) => {
try {
  jwt.sign({ userId }, JWT_SECRET!, { expiresIn: JWT_LIFE_TIME }, (error, token) => {
    if (error) {
      return reject(error);
    }
    resolve(token);
    return true;
  })
} catch (error) {
  console.error('error from generateToken >>',error);
  throw error
}
});

export default generateToken;

