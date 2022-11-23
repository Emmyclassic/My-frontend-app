export const IDENTITY_BASE_URL = process.env.REACT_APP_IDENTITY_BASE_URL;
export const EVENT_BASE_URL = process.env.REACT_APP_EVENT_BASE_URL;
export const PAYMENT_BASE_URL = process.env.REACT_APP_PAYMENT_BASE_URL;
export const VOTES_BASE_URL = process.env.REACT_APP_VOTES_BASE_URL;
export const NOTIFCATION_BASE_URL = process.env.REACT_APP_NOTIFICATION_BASE_URL;
export const GOOGLE_RECAPTCHA_SITE_KEY =
  process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY ||
  "6LeBUgghAAAAAB-njFDYF2RsCmam2Fx1Yt3n-LmF";

export const BANKS_BASE_URL = `${IDENTITY_BASE_URL}/api/banks`;
export const STATES_BASE_URL = `${IDENTITY_BASE_URL}/api/states`;
export const CHANGE_PASSWORD_BASE_URL = `${IDENTITY_BASE_URL}/api/user/change-password`;
export const SOCIALS_URL = `${IDENTITY_BASE_URL}/api/user/socials`;
export const UPDATE_SOCIALS_URL = `${IDENTITY_BASE_URL}/api/user/socials/update`;
export const BANK_ACCOUNT_URL = `${IDENTITY_BASE_URL}/api/user/account`;
export const VERIFY_ACCOUNT_URL = `${IDENTITY_BASE_URL}/api/user/account/update`;
export const DELETE_ACCOUNT_URL = `${IDENTITY_BASE_URL}/api/user/account/delete`;
export const REQUEST_OTP_URL = `${IDENTITY_BASE_URL}/api/otp`;
export const CONFIRM_PASSWORD_URL = `${IDENTITY_BASE_URL}/api/user/confirm-password`;
export const VERIFY_OTP_URL = `${IDENTITY_BASE_URL}/api/otp/verify`;

export const CREATE_CAMPAIGN_URL = `${EVENT_BASE_URL}/campaign`;
export const REQUEST_ACCOUNT_BALANCE = `${EVENT_BASE_URL}/balance`;

export const PROFILE_BASE_URL = `${IDENTITY_BASE_URL}/api/user`;
export const UPDATE_PROFILE_BASE_URL = `${IDENTITY_BASE_URL}/api/user/update`;

export const REGISTER_URL = `${IDENTITY_BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${IDENTITY_BASE_URL}/api/auth/login`;
export const LOGOUT_URL = `${IDENTITY_BASE_URL}/api/auth/logout`;

export const FORGOT_PASSWORD_URL = `${IDENTITY_BASE_URL}/api/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${IDENTITY_BASE_URL}/api/auth/reset-password`;
export const EVENTYPE_URL = `${EVENT_BASE_URL}/event_types`;
export const EVENTS_URL = `${EVENT_BASE_URL}/events`;
export const CREATE_EVENT_URL = `${EVENT_BASE_URL}/events`;
export const MEETING_URL = `${EVENT_BASE_URL}/meeting`;
export const PROXY_URL = `${EVENT_BASE_URL}/proxy`;

export const ATTENDEE_URL = `${EVENT_BASE_URL}/attendee_list`;

export const LIVESTREAM_URL = `${EVENT_BASE_URL}/livestream`;

export const RESOURCE_URL = `${EVENT_BASE_URL}/resources`;

export const DONATION_URL = `${EVENT_BASE_URL}/donations`;
export const UPLOAD_FILE_URL = `${EVENT_BASE_URL}/assets/upload`;

export const BROWSE_EVENTS_URL = `${EVENT_BASE_URL}/events/public/browse`;

export const EVENT_TICKET_URL = `${EVENT_BASE_URL}/tickets`;
export const EVENT_TICKET_TYPE_URL = `${EVENT_BASE_URL}/ticket_types`;

export const PAYMENT_URL = `${PAYMENT_BASE_URL}`;
export const MAKE_PAYMENT_URL = `${PAYMENT_BASE_URL}/payments/payouts`;
export const RESOLUTIONS_URL = `${VOTES_BASE_URL}/resolutions`;
export const ELECTION_URL = `${VOTES_BASE_URL}/elections`;

export const QUESTIONAIIRE_URL = `${VOTES_BASE_URL}/questionnaires`;
export const POLL_URL = `${VOTES_BASE_URL}/polls`;
export const PROXY_VOTE_URL = `${VOTES_BASE_URL}/votes`;
export const VOTE_RESULT_URL = `${VOTES_BASE_URL}/results`;
export const BULK_SMS_URL = `${NOTIFCATION_BASE_URL}/sms/bulk-sms`;
export const SINGLE_SMS_URL = `${NOTIFCATION_BASE_URL}/sms/single-sms`;
export const MARKETING_BASE_URL = `${NOTIFCATION_BASE_URL}/marketing`;

export const CREATE_OBSERVER_URL = `${VOTES_BASE_URL}/elections`;
