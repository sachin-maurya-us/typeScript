const myEvents = async(parent: any, { input }: any, context: any) =>  {
  try {
    const { models: { Event: EventModel }, req } = context;

    const allEvents = await EventModel.findAll({ where: { creatorId: req.user.id } })

    return allEvents;
  } catch (error) {
    console.log(`Error from myEvents >> ${error}`);
    return error;
  }
}

export default myEvents;
