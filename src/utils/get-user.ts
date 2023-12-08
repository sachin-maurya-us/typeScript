import jwt from "jsonwebtoken";

require('dotenv').config();

interface JwtPayload {
    userId: string;
    iat: number;
    exp: number;
  }

export async function getUser(token: string, User: any) {
  try {
    if (!token) return null;
    let decoded: JwtPayload;
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded) return null;
    
    // get the user by id
    const user = await User.findOne({ where: { id: decoded.userId }, attribute: ['id', 'name', 'email']})

    return user;
  } catch (error) {
    console.error('error from getUser >>',error);
    throw error
  }
}