const getInvitedEvents = async(parent: any, { input }: any, context: any) => {
    try {
      const { models: { Event: EventModel, User: UserModel, Invitees:InviteesModel }, req } = context;
      const invitedEvents = await InviteesModel.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: EventModel,
            as: 'event',
            attributes: ['id', 'eventName', 'startDate', 'endDate', 'place', 'creatorId'],
            include: [
              {
                model: UserModel,
                as: 'creator',
                attributes: ['name','email','id'],
              },
            ],
          },
        ],
      });
      

      const events = invitedEvents.map((invitee:any) => ({
        id: invitee.event.id,
        eventName: invitee.event.eventName,
        startDate: invitee.event.startDate,
        endDate: invitee.event.endDate,
        place: invitee.event.place,
        creator: {
          id: invitee.event.creator.id,
          name: invitee.event.creator.name,
          email: invitee.event.creator.email,
        },
      }));
        
      return events;
    } catch (error) {
      console.log(`Error from getInvitedEvents => ${error}`);
      return error;
    }
  }
  
  export default getInvitedEvents;
  