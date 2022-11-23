import React from "react";
import { useHistory } from "react-router";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";

const SuccessPage = () => {
  const history = useHistory();
  return (
    <PrivateGenericLayout
      leftNav={<DashboardLeftHeaderNav title="" subtitle="" />}
    >
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
          <p className={style.description}>
            SMS to Attendees Successfully Sent
          </p>
          <button
            className={style.feedback_btn}
            type="button"
            onClick={() => history.push("/event/list")}
          >
            {"Continue >>>"}
          </button>
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default SuccessPage;
