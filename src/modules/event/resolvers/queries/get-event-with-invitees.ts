const getEventWithInvitees = async(parent: any, { input }: any, context: any) => {
  try {
    const { models: { Event: EventModel, User: UserModel, Invitees: InviteesModel }, req } = context;
    const { eventId } = input;
    const event = await EventModel.findAll({
        where: {
          creatorId: req.user.id,
          id: eventId
        },
        include: [
          {
            model: UserModel,
            as: 'creator',
            attributes: ['id', 'email', 'name'],
          },
          {
            model: InviteesModel,
            as: 'invitees',
            include: [
              {
                model: EventModel,
                as: 'event',
                attributes: ['eventName'],
              },
              {
                model: UserModel,
                as: 'invited',
                attributes: ['id','name', 'email'],
              },
            ],
          },
        ],
        attributes: ['id', 'eventName', 'startDate', 'endDate', 'place', 'creatorId'],
      });
      
    return event;
  } catch (error) {
    console.log(`Error from getEventWithInvitees => ${error}`);
    return error;
  }
}

export default getEventWithInvitees;
