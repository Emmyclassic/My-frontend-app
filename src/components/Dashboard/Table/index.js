import React from "react";
import style from "./index.module.scss";
import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";

const Table = ({ list, dropdownList, type }) => {
  console.log({ list });
  return (
    <table className={style.table}>
      <thead>
        <tr className={style.head}>
          <th>Ticket Name</th>
          {!type && <th>Quantity</th>}
          <th>Price</th>
          <th>{!type ? "Sold" : "Order Number"}</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>
              <div>
                <p>
                  <span className={style.text_bold}>{item.label} - </span>
                  <span className={`${style.text_green} ${style.text_bold}`}>
                    {item.name}
                  </span>
                </p>
                <span className={style.ticket_desc}>{item.period}</span>
              </div>
            </td>
            {!type && (
              <td>
                <div className={style.table_border}>{item.quantity}</div>
              </td>
            )}
            <td>
              <div className={style.table_border}>
                {item.price === "0.00"
                  ? "Free"
                  : `N${item.price.split(".")[0]}`}
              </div>
            </td>
            <td>
              <div className={style.table_border}>
                {!type ? item.sold_tickets : item.orderNumber}
              </div>
            </td>
            <td
              className={
                item.active_status === 1
                  ? style.status_open
                  : style.status_close
              }
            >
              <div className={style.table_border}>
                {item.active_status === 1 ? "Open" : "Closed"}
              </div>
            </td>
            <td>
              <div className={style.table_border}>
                <Dropdown
                  overlay={() => dropdownList(item.id)}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <span>
                    <BsThreeDotsVertical
                      size="18"
                      className={style.three_dots}
                    />
                  </span>
                </Dropdown>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
