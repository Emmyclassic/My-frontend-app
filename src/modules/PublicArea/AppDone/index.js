import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import EventPreviewLayout from "../../../components/Layout/EventPreviewLayout";
import style from "./index.module.scss";

const AppDone = () => {
  const history = useHistory();
  const location = useLocation();
  console.log("location", location.state);
  return (
    <EventPreviewLayout>
      <section className={style.container}>
        <div className={style.feedbackBox}>
          <div className={style.iconWrap}>
            <div className={style.iconBox}>
              <img
                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940342/apems/fireworks_wlr8nr.png"
                className={style.congratImg}
              />
            </div>
          </div>

          <h1 className={style.feedbackType}>Successful</h1>
          <p className={style.description}>{location.state?.message}</p>
          <button
            className={style.feedback_btn}
            type="button"
            onClick={() => history.push(`${location.state?.returnUrl}`)}
          >
            {"Continue >>>"}
          </button>
        </div>
      </section>
    </EventPreviewLayout>
  );
};

export default AppDone;
