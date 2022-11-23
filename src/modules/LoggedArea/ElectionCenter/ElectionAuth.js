import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import GoogleTranslateButton from "../../../components/Buttons/GoogleTranslate/GoogleTranslate";
import electionCenter2 from "../../../assets/icons/election-center2.svg";
import electionCenter3 from "../../../assets/icons/election-center3.png";
import { observerAuth } from "../../../api/electionObserverHandler";

const ElectionAuth = ({ setIssSignIn, setToken, setObservEventId }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    passcode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const location = useLocation();

  console.log(location, id);
  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleElectionCenterLogin = async (e) => {
    e.preventDefault();
    const { email, passcode } = credentials;
    const reqBody = {
      email,
      passcode,
      payload: id,
    };
    try {
      setLoading(true);
      const { data } = await observerAuth(reqBody);
      const { event_id, bearer } = data;
      console.log(data, bearer, event_id);
      setLoading(false);
      setIssSignIn(true);
      setToken(bearer);
      setObservEventId(event_id);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage("Incorrect token passed");
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <div className={style.container}>
          <div className={style.logo_wrapper}>
            <div className={style.logo}>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp"
                  alt="logo"
                />
              </Link>
            </div>
            <div
              className={style.language}
              style={{ border: "2px solid white" }}
            >
              <div style={{ color: "white" }}>Language</div>
              <span className={style.lang}>
                <GoogleTranslateButton googleTrans={false} />
              </span>
            </div>
          </div>
          <div className={style.bg_img}>
            <div></div>
            <img src={electionCenter3} alt="" />
          </div>
          <div className={style.login_wrapper}>
            <div>
              <h2>Sign in</h2>
              <form onSubmit={handleElectionCenterLogin}>
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "2rem",
                  }}
                >
                  {message}
                </p>
                <label htmlFor="email">Your Email Address</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={handleInput}
                  name="email"
                  required
                  placeholder="Enter your email address"
                />
                <label htmlFor="email">Passcode</label>
                <input
                  name="passcode"
                  type="password"
                  value={credentials.passcode}
                  onChange={handleInput}
                  required
                  placeholder="Enter your passcode"
                />
                <button type="submit">
                  {loading ? "Signing ..." : "Sign in"}
                </button>
              </form>
            </div>
            <div>
              <div>
                <h1>Elections Centre</h1>
                <div>
                  <img src={electionCenter2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ElectionAuth;
