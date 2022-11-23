import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import { getBankAccountAction } from "../../Profile/state/action";
import { getAccountBalance } from "../state/action";
// import { makePayment } from "../../../../api/payoutHandler";

import style from "../EditTicket/index.module.scss";

function Payout() {
  const dispatch = useDispatch();
  const { bankAccount, userBankName } = useSelector(
    (state) => state.bankDetails
  );
  const { name } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.accountBalance);
  // const {
  //   balance: {
  //     data: { balance },
  //   },
  // } = useSelector((state) => state.accountBalance);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  console.log({ balance });
  const handleSubmit = () => {
    console.log("submitting");
  };

  const truncate = (input) => {
    return input.toString().substring(0, 5) + "******";
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const handleAmountChange = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    const bal = balance.data.balance;
    if (Number(newVal) >= bal) {
      console.log("Insufficient fund...");
      return;
    }
    setAmount(newVal);
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (bankAccount) {
      setAccountNumber(truncate(bankAccount));
    }
    setBankName(userBankName);
    setAccountName(name);
  }, [name, userBankName, bankAccount]);

  useEffect(() => {
    dispatch(getBankAccountAction());
    dispatch(getAccountBalance());
  }, []);
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Request Payout"
            subtitle="Please enter the requested amount you'd like to credit your account"
          />
        </>
      }
    >
      <div className={style.main}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="acountNumber" className={style.form__input_label}>
              Account Name
            </label>
            <input
              className={style.form__input_readOnly}
              type="text"
              value={accountName}
              name="acountNumber"
              readOnly
              style={{ backgroundColor: "#F4F6F7" }}
            />
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="acountName" className={style.form__input_label}>
              Account Number
            </label>
            <input
              className={style.form__input_readOnly}
              type="text"
              value={accountNumber}
              name="acountName"
              readOnly
              style={{ backgroundColor: "#F4F6F7" }}
            />
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="bankName" className={style.form__input_label}>
              Bank Name
            </label>
            <input
              className={style.form__input_readOnly}
              type="text"
              value={bankName}
              name="bankName"
              readOnly
              style={{ backgroundColor: "#F4F6F7" }}
            />
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label htmlFor="amount" className={style.form__input_label}>
                Amount
              </label>
              <div>
                <label htmlFor="amount" className={style.form__input_label}>
                  Balance:
                </label>
                <span style={{ color: "#09974D" }}>
                  {" "}
                  {/* ₦
                  {balance &&
                    balance.status === "success" &&
                    balance.data.balance} */}
                  <NumberFormat
                    value={
                      balance &&
                      balance.status === "success" &&
                      balance.data.balance
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </span>
              </div>
            </div>
            <NumberFormat
              value={amount}
              thousandSeparator={true}
              className="form__input"
              onChange={handleAmountChange}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              required
            />
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <button
            onClick={handleSubmit}
            type="button"
            // disabled={loading}
            className={style.request_payout}
            style={{ marginTop: "2rem" }}
          >
            Send Payout
          </button>
        </div>
      </div>
    </PrivateGenericLayout>
  );
}

Payout.propTypes = {
  id: PropTypes.string,
};

export default Payout;
