import { DatePicker, TimePicker } from "antd";
import React from "react";
import style from "./index.module.scss";
import "./index.scss";

const CustomDatePicker = ({
  showTime,
  showDate = true,
  disabledDate,
  dateHandler,
  timeHandler,
  disabledHours,
  disabledMinutes,
  dateValue,
  timeValue,
  value,
  actualTime,
}) => {
  // const [stateValue, setStateValue] = useState(value);

  return (
    <div className={style.input__date}>
      {showDate && (
        <DatePicker
          defaultValue={dateValue}
          format="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          disabledDate={disabledDate}
          allowClear={false}
          className="form__input_date date_pick"
          onChange={dateHandler}
          value={value}
        />
      )}

      {showTime && (
        <TimePicker
          placeholder="HH:MM"
          defaultValue={timeValue}
          showTime={{ format: "HH:mm" }}
          onChange={timeHandler}
          allowClear={false}
          className="time_pick"
          disabledHours={disabledHours}
          value={actualTime}
          // disabledMinutes={disabledMinutes}
        />
      )}
    </div>
  );
};

export default CustomDatePicker;
