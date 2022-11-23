import { combineReducers } from "redux";
import { eventsReducer } from "../modules/LoggedArea/BrowseEvent/state/reducer";
import {
  addProxyReducer,
  proxyReducer,
} from "../modules/LoggedArea/CreateEvent/Attendee/state/proxyReducer";
import {
  addAttendeeReducer,
  attendeeReducer,
} from "../modules/LoggedArea/CreateEvent/Attendee/state/reducer";
import { createTicketReducer } from "../modules/LoggedArea/CreateEvent/Payment/state/reducer";
import { createEventReducer } from "../modules/LoggedArea/CreateEvent/state/reducer";
import { eventTypeReducer } from "../modules/LoggedArea/EventTypes/state/reducer";
import { emailCampaignReducer } from "../modules/LoggedArea/Email/state/reducer";
import {
  eventsTicketReducer,
  ticketTypeReducer,
  accountBalanceReducer,
} from "../modules/LoggedArea/Ticket/state/reducer";
import {
  bankReducer,
  socialReducer,
  profileReducer,
  stateReducer,
  bankAccountReducer,
} from "../modules/LoggedArea/Profile/state/reducer";
import { notifcationReducer } from "./notification";
import { askQuestionReducer } from "./question";
import {
  privateSidebarReducer,
  publicSidebarReducer,
  uiReducer,
} from "./uiReducer";
export default combineReducers({
  ui: uiReducer,
  publicSidebar: publicSidebarReducer,
  privateSidebar: privateSidebarReducer,
  eventTypes: eventTypeReducer,
  createEvent: createEventReducer,
  createTicket: createTicketReducer,
  events: eventsReducer,
  ticket: eventsTicketReducer,
  attendeeReducer: addAttendeeReducer,
  attendees: attendeeReducer,
  proxyReducer: addProxyReducer,
  proxies: proxyReducer,
  ticketTypes: ticketTypeReducer,
  banks: bankReducer,
  social: socialReducer,
  profile: profileReducer,
  states: stateReducer,
  bankDetails: bankAccountReducer,
  emailCampaign: emailCampaignReducer,
  accountBalance: accountBalanceReducer,
  notifications: notifcationReducer,
  questions: askQuestionReducer,
});
