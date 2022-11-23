import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./calender.scss";

const EventCalender = ({ handleCalender, dateArr, handleDayEvent }) => {
  // const [selectedDay, setSelectedDay] = useState(null);
  const formatShortWeekday = (locale, date) => {
    return moment(date).format("dd");
  };

  const monthHandler = (dateSelected) => {
    handleCalender(moment(dateSelected).format("MMMM"));
  };
  const changeHandler = (e) => {
    console.log("change", e);
  };

  // useEffect(() => {
  //   console.log("nsxnsjxnsjxnsjxs", dateArr());
  // });

  const handleTileClass = ({ date, view }) => {
    if (dateArr) {
      const arr = dateArr();
      if (arr.length > 0) {
        const dateStr = moment(date).format("YYYY-MM-DD");

        if (arr.includes(dateStr)) {
          return "custom-today-day";
        }
      }
    }
  };
  return (
    <Calendar
      className="apemsCalender"
      onClickMonth={monthHandler}
      onChange={changeHandler}
      onClickDay={handleDayEvent}
      next2Label={<DoubleArrowRight />}
      nextLabel={<DoubleArrowLeft />}
      tileClassName={handleTileClass}
      prev2Label={<SingleArrowLeft />}
      prevLabel={<ArrowLeft />}
      formatShortWeekday={formatShortWeekday}
    />
  );
};
const DoubleArrowRight = () => {
  return (
    <span className="doubleArrowRight">
      <HiOutlineChevronDoubleRight size={20} color="#EF3125" />
    </span>
  );
};
const DoubleArrowLeft = () => {
  return (
    <span className="doubleArrowLeft">
      <IoIosArrowForward size={20} color="#DADFE6" />
    </span>
  );
};

const ArrowLeft = () => {
  return (
    <span className="doubleArrowLeft">
      <IoIosArrowBack size={20} color="#DADFE6" />
    </span>
  );
};

const SingleArrowLeft = () => {
  return (
    <span className="doubleArrowRight arrow-space">
      <HiOutlineChevronDoubleLeft size={20} color="#EF3125" />
    </span>
  );
};

export default EventCalender;
