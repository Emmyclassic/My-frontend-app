import {
  addAttendee,
  addProxy,
  getAttendees,
  getProxies,
  removeAttendees,
  removeProxy,
} from "./attendeeHandler";
import { login, registerUser } from "./authHandler";
import { makePayment } from "./payoutHandler";
import {
  browseEvents,
  createEvent,
  fetchEvent,
  getEvents,
  getEventTypes,
} from "./eventHandler";
import {
  archiveTicket,
  createTicket,
  fetchTicket,
  fetchTicketSales,
  getEventTicket,
  getTicketType,
  updateTicket,
  getAccountBalance,
} from "./ticketHandler";
import {
  getBanks,
  fetchSocialHandles,
  updateSocialHandles,
  fetchProfile,
  updateProfile,
  getStates,
  verifyBankAccount,
  getBankAccount,
  fetchOTP,
  verifyOTP,
  deleteBankAccount,
} from "./settingsHandler";
import { sendBulkSMS } from "./smsHandler";
import {
  createEmailCampaign,
  addEmailContent,
  sendTestEmail,
  sendMarketingEmail,
} from "./emailHandler";
export default {
  registerUser,
  login,
  getEventTypes,
  createEvent,
  getEvents,
  browseEvents,
  createTicket,
  getEventTicket,
  fetchEvent,
  fetchTicket,
  archiveTicket,
  updateTicket,
  addAttendee,
  getAttendees,
  removeAttendees,
  getTicketType,
  addProxy,
  removeProxy,
  getProxies,
  fetchTicketSales,
  getBanks,
  fetchSocialHandles,
  updateSocialHandles,
  fetchProfile,
  updateProfile,
  getStates,
  verifyBankAccount,
  getBankAccount,
  fetchOTP,
  verifyOTP,
  deleteBankAccount,
  sendBulkSMS,
  createEmailCampaign,
  addEmailContent,
  sendTestEmail,
  sendMarketingEmail,
  getAccountBalance,
  makePayment,
};
