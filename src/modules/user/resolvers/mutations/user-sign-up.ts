import { Op } from 'sequelize';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt'


const userSignUp = async(parent: any, { input }: any, context: any) => {
  const { models } = context;
  const { name, email, password } = input;
    const getUser = await models.User.findOne({ where: { email: { [Op.iLike]: email } } });
    try {
      if (getUser) {
        throw new GraphQLError('Email already exist');
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await models.User.create({
        name,
        email,
        password: passwordHash,
      });
      return { message: 'User created successful' };
    }
    catch (error) {
      console.error(`Error from userSignUp => ${error}`);
      return error;
    }
};

export default userSignUp;