
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt'
import generateToken from '../../../../utils/generate-token';
const logIn = async (parent:any, { input }:any, context:any) => {
  try {
    const { models: { User: UserModel,AccessToken: AccessTokenModel }, Sequelize: { Op } } = context;
    const { email, password } = input;
    const user = await UserModel.findOne({
      where: { email: { [Op.iLike]: email } },
    });

    if (!user) {
      throw new GraphQLError('User Not Found');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new GraphQLError("Please give a valid credential");
    }

    const accessToken = await generateToken(user.id);

    await AccessTokenModel.create({
      userId: user.id,
      accessToken,
    });

    return {
      accessToken,
      message: 'Login successful',
    };
  } catch (error) {
    console.error(`Error from logIn resolver => ${error}`);
    throw error;
  }
};

export default logIn;

