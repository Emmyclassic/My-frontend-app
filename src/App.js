import React from "react";
import CookieConsentWrapper from "./components/CookieConsent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ElectionCenter from "./modules/LoggedArea/ElectionCenter";
import BrowseEvent from "./modules/LoggedArea/BrowseEvent";
import CreateEvent from "./modules/LoggedArea/CreateEvent";
import ConcertEvent from "./modules/LoggedArea/CreateEvent/ConcertEvent";
import CreateCoperateEvent from "./modules/LoggedArea/CreateEvent/CorperateEvent";
import EventSuccess from "./modules/LoggedArea/CreateEvent/EventSuccess";
import PreviewEvent from "./modules/LoggedArea/CreateEvent/Preview";
import EditPreview from "./modules/LoggedArea/CreateEvent/Preview/editPreview";
import PreviewPublishEvent from "./modules/LoggedArea/CreateEvent/Preview/PreviewEvent";
import ResourceGallery from "./modules/LoggedArea/CreateEvent/ResourceGallery";
import Dashboard from "./modules/LoggedArea/Dashboard/Dashboard";
import CampaignEmail from "./modules/LoggedArea/Email/CampaignEmail";
import EditTemplate from "./modules/LoggedArea/Email/EditTemplate";
import EmailTemplate from "./modules/LoggedArea/Email/EmailTemplate";
import PreviewEmail from "./modules/LoggedArea/Email/PreviewEmail";
import SendEmail from "./modules/LoggedArea/Email/SendEmail";
import EventDetails from "./modules/LoggedArea/EventDetails";
import EventGallery from "./modules/LoggedArea/EventGallery";
import SuccessPage from "./modules/LoggedArea/EventGallery/SuccessPage";
import EventJoin from "./modules/LoggedArea/EventJoin";
import EventTypes from "./modules/LoggedArea/EventTypes";
import MeetingDashboard from "./modules/LoggedArea/MeetingDashboard";
import AttendeeMeetingDashboard from "./modules/LoggedArea/MeetingDashboard/AttendeeDashBoard";
import LivestreamMeetingDashboard from "./modules/LoggedArea/MeetingDashboard/Livestream";
import MyEvent from "./modules/LoggedArea/MyEvent";
import EventSummary from "./modules/LoggedArea/MyEvent/EventSummary";
import NoticeCampaign from "./modules/LoggedArea/MyEvent/NoticeCampaign";
import Profile from "./modules/LoggedArea/Profile";
import Recordings from "./modules/LoggedArea/Recordings";
import EditTicket from "./modules/LoggedArea/Ticket/EditTicket";
import MyTicket from "./modules/LoggedArea/Ticket/MainPage";
import Payout from "./modules/LoggedArea/Ticket/Payout";
import TicketDetail from "./modules/LoggedArea/Ticket/TicketDetail";
import DonationDetail from "./modules/LoggedArea/Ticket/TicketDetail/Donation";
import About from "./modules/PublicArea/About";
import AppDone from "./modules/PublicArea/AppDone";
import AudioTest from "./modules/PublicArea/AudioTest";
import ConcertPreview from "./modules/PublicArea/ConcertPreview";
import ContactUs from "./modules/PublicArea/ContactUs";
import CorperateEvent from "./modules/PublicArea/CorperateEvent";
import Events from "./modules/PublicArea/Event/Event";
import EventJoinOverview from "./modules/PublicArea/EventJoin";
import EventJoinPreview from "./modules/PublicArea/EventPreview";
import EventEditJoinPreview from "./modules/PublicArea/EventPreview/EditEventPreview";
import EventJoinPublishPreview from "./modules/PublicArea/EventPreview/PushlishJoin";
import FrequentlyAskedQuestion from "./modules/PublicArea/FrequentlyAskedQuestion";
import GeneralMeeting from "./modules/PublicArea/GeneralMeeting";
import HomePage from "./modules/PublicArea/HomePage";
import JoinMeeting from "./modules/PublicArea/JoinMeeting/JoinMeeting";
import Pricing from "./modules/PublicArea/Pricing/Pricing";
import PriceCart from "./modules/PublicArea/PricingCart/PricingCart";
import PrivacyPolicy from "./modules/PublicArea/PrivacyPolicy";
import DownloadReport from "./modules/PublicArea/Report/Report";
import ShowEvent from "./modules/PublicArea/ShowEvent";
import TermsOfUse from "./modules/PublicArea/TermsOfUse";
import WaitingRoom from "./modules/PublicArea/WaitingRoom";
import { PrivateRoute } from "./Routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Download/Report" exact component={DownloadReport} />
          <Route path="/Pricing" exact component={Pricing} />
          <Route path="/Price/Cart" exact component={PriceCart} />
          <Route path="/Events" exact component={Events} />
          <Route path="/Meeting/Join" exact component={JoinMeeting} />
          <PrivateRoute path="/Dashboard" exact component={Dashboard} />
          <PrivateRoute path="/Event/join" exact component={EventJoin} />
          <PrivateRoute path="/MyTicket" exact component={MyTicket} />
          <PrivateRoute
            path="/MyTicket/detail/:id"
            exact
            component={TicketDetail}
          />
          <PrivateRoute
            path="/Donation/detail/:id"
            exact
            component={DonationDetail}
          />
          <PrivateRoute
            path="/MyTicket/edit/:id"
            exact
            component={EditTicket}
          />
          <PrivateRoute path="/MyTicket/payout" exact component={Payout} />
          <PrivateRoute path="/MyProfile" exact component={Profile} />

          <PrivateRoute path="/waiting" exact component={WaitingRoom} />

          <PrivateRoute path="/Audio/test" exact component={AudioTest} />
          <PrivateRoute path="/Email" exact component={EmailTemplate} />
          <PrivateRoute path="/CampaignEmail" exact component={CampaignEmail} />
          <PrivateRoute path="/Email/edit" exact component={EditTemplate} />
          <PrivateRoute path="/Email/preview" exact component={PreviewEmail} />
          <Route path="/Email/Send" exact component={SendEmail} />
          <Route path="/GeneralMeeting" exact component={GeneralMeeting} />
          <Route path="/Corperate" exact component={CorperateEvent} />
          <Route path="/ShowEvent" exact component={ShowEvent} />
          <Route path="/About" exact component={About} />
          <Route path="/ContactUs" exact component={ContactUs} />
          <Route path="/Event/join/:id" exact component={EventJoinPreview} />
          <PrivateRoute
            path="/Event/edit/join/:id"
            exact
            component={EventEditJoinPreview}
          />
          <PrivateRoute
            path="/Event/Publish/join/:id"
            exact
            component={EventJoinPublishPreview}
          />
          <Route
            path="/Event/concert/overview/:id"
            exact
            component={ConcertPreview}
          />
          <PrivateRoute
            path="/Event/join/overview"
            exact
            component={EventJoinOverview}
          />
          <Route path="/TermsOfUse" exact component={TermsOfUse} />
          <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
          <Route
            path="/FrequentlyAsked"
            exact
            component={FrequentlyAskedQuestion}
          />
          <PrivateRoute path="/Event/Types" exact component={EventTypes} />
          <PrivateRoute path="/Dashboard" exact component={Dashboard} />
          <PrivateRoute
            path="/Event/Create/:id"
            exact
            component={CreateEvent}
          />
          <PrivateRoute path="/Event/Success" exact component={EventSuccess} />
          <PrivateRoute
            path="/Campaign/Success"
            exact
            component={SuccessPage}
          />
          <PrivateRoute path="/Done" exact component={AppDone} />
          <Route path="/Event/Concert/:id" exact component={ConcertEvent} />
          <PrivateRoute path="/Event/browse" exact component={BrowseEvent} />
          <PrivateRoute
            path="/Event/edit/preview/:id"
            exact
            component={EditPreview}
          />
          <PrivateRoute
            path="/Event/preview/:id"
            exact
            component={PreviewEvent}
          />
          <PrivateRoute
            path="/Event/publish/preview/:id"
            exact
            component={PreviewPublishEvent}
          />
          <PrivateRoute
            path="/Event/gallery"
            exact
            component={ResourceGallery}
          />
          <PrivateRoute path="/Event/list" exact component={MyEvent} />
          <PrivateRoute path="/EventDetails" exact component={EventDetails} />
          <PrivateRoute
            path="/EventSummary/:id"
            exact
            component={EventSummary}
          />

          <PrivateRoute
            path="/NoticeCampaign/:id"
            exact
            component={NoticeCampaign}
          />
          <PrivateRoute path="/Event/:id" exact component={EventGallery} />
          <Route path="/election-center/:id" exact component={ElectionCenter} />
          <Route path="/Meeting" exact component={MeetingDashboard} />
          <Route
            path="/Livestream"
            exact
            component={LivestreamMeetingDashboard}
          />
          <PrivateRoute path="/Recordings" exact component={Recordings} />
          <PrivateRoute
            path="/Host/Meeting"
            exact
            component={AttendeeMeetingDashboard}
          />
          <PrivateRoute
            path="/Event/Corperate/:id"
            exact
            component={CreateCoperateEvent}
          />
          <Route path="*" exact component={HomePage} />
        </Switch>
      </Router>
      <CookieConsentWrapper />
    </div>
  );
}

export default App;
