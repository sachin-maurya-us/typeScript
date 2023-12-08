import { GraphQLError } from "graphql";

const invite = async(parent: any, { input }: any, context: any) => {
  const { models: { Event: EventModel, User: UserModel, Invitees: InviteesModel }, req } = context;
  const { email, eventId } = input;
  
  try {
    const user = await UserModel.findOne({ where: { email: email }, });
    if (!user) {
      throw new GraphQLError('No user found!');
    }

    const event = await EventModel.findOne({ where: { id: eventId } });
    if (!event) {
      throw new Error("No such event found!");
    }

    const invited = await InviteesModel.findOne({ where: { userId: user.id, eventId } })
    
    if (invited) {
      throw new Error("User has already been invited to the event!");
    }
    await InviteesModel.create({ userId: user.id, eventId });
    return {
      message: `${user.email} invited to the ${event.eventName} event.`,
    };
  }
  catch (error) {
    console.log(`Error from invite => ${error}`);
    return error;
  }
}

export default invite;
