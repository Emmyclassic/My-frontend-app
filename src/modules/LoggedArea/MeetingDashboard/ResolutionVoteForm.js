import React from "react";
// import moment from "moment";

import PollListItem from "./PollListItem";
import style from "./index.module.scss";

const ResolutionVoteForm = ({
  polls,
  isPoll,
  isResolution,
  pusher,
  userProfile,
  reloadResolution,
}) => {
  console.log({ pollResolution: polls });
  const namePlaceHolder = (userProfile) => {
    if (userProfile) {
      console.log({ userProfile });
      const name = userProfile.split(" ");
      console.log({ userProfile, name });
      const firstName = name[0];
      let lastName = "";
      if (name.length > 1) {
        lastName = name[1];
        return `${firstName[0]}${lastName[0]}`;
      } else {
        return `${firstName[0]}`;
      }
    }
    return "";
  };
  return (
    <div className={style.contentPoll}>
      <div className={style.userAvatarBox}>
        <span className={style.userAvatarIcon}>
          {" "}
          {namePlaceHolder(userProfile?.fullName ?? "")}
        </span>
        <div className={style.userAvatarTitle}>
          <div className={style.avatarSubCont}>
            <span className={style.userAvatarName}>Name</span>
            <span className={style.userAvatarName}>
              {userProfile?.fullName ?? ""}
            </span>
          </div>
          <div className={style.avatarSubCont}>
            <span className={style.userAvatarName}>Account</span>
            <span className={style.userAvatarName}>
              {userProfile?.accountName ?? ""}
            </span>
          </div>
          <div className={style.avatarSubCont}>
            <span className={style.userAvatarName}>Vote Right</span>
            <span className={style.userAvatarName}>
              {userProfile?.voteRight ?? ""}
            </span>
          </div>
        </div>
      </div>

      {polls.length > 0
        ? polls.map((item) => (
            <PollListItem
              pusher={pusher}
              item={item}
              key={item.id}
              options={item.options}
              reloadResolution={reloadResolution}
            />
          ))
        : null}
    </div>
  );
};

export default ResolutionVoteForm;
