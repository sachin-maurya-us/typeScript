import createEvent from "./mutations/create-event";
import invite from "./mutations/invite";
import getEventWithInvitees from "./queries/get-event-with-invitees";
import getInvitedEvents from "./queries/invited-events";
import myEvents from "./queries/my-events";
module.exports = {
    Mutation: {
      createEvent,
      invite
    },
    Query: {
      myEvents,
      getEventWithInvitees,
      getInvitedEvents
    },
  };