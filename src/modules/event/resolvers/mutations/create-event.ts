import moment from "moment";

const createEvent = async(parent: any, { input }: any, context: any) => {
    const { models: { Event: EventModel }, req } = context;
    const { eventName, startDate, endDate, place } = input;
    const start_date = moment(startDate)
    const end_date = moment(endDate);
      try {
        await EventModel.create({ eventName, startDate: start_date, endDate: end_date, place, creatorId: req.user.id });
        
        return {
            message: "Event created successful!"
        };
      } catch (error) {
        console.log(`Error from add createEvent >> ${error}`);
        return error;
      }
}

export default createEvent;