import React from "react";
import { BiCalendarAlt } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Svg from "react-inlinesvg";
import SingleSelect, {
  TicketPurchase,
} from "../../../components/Cards/SingleCardSelect";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";

const EventDetails = () => {
  return (
    <PrivateGenericLayout
      leftNav={
        <div className={style.containerNav_left}>
          <span className={style.containerNav_iconBox}>
            <MdKeyboardArrowLeft size={20} />
          </span>
        </div>
      }
    >
      <section className={style.main}>
        <div className={style.eventContainer}>
          <div className={style.eventContainer_left}>
            <h3 className={style.eventContainer_left_title}>
              Africaprudential Stakeholders Meeting
            </h3>
            <div className={style.eventContainer_wrap}>
              <span className={style.card__top__logo}>
                <Svg src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/logo_uu5c7n.svg" />
              </span>
              <div className={style.eventFooter}>
                <span className={style.iconBox}>
                  <BiCalendarAlt size={18} />
                </span>
                <span className={style.eventDate}>
                  Thursday 28, January 2020 9:00 - 10:00am
                </span>
              </div>
            </div>
            <div className={style.eventContent}>
              <p className={style.eventContent_para}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className={style.userList}>
                <div className={style.main__right__user__list}>
                  <div className={style.name__avatar__box}>
                    <span className={style.name__avatar__box__avatar}>AD</span>
                    <span className={style.name__avatar__box__avatar}>AD</span>
                    <span className={style.name__avatar__box__avatar}>AD</span>
                  </div>
                  <div className={style.name__avatar__count}>+12 Accepted</div>
                </div>
              </div>
              <div className={style.resourceSection}>
                <h3 className={style.resourceTitle}>Resources</h3>
                <div>
                  <div className={style.uploadedDoc_list}>
                    <div className={style.uploadedDoc_list_item}>
                      <div className={style.uploadImg_name}>
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                          className={style.uploadImg}
                        />
                        <span className={style.uploadFile}>
                          Brief Report .pdf (1.5mb)
                        </span>
                      </div>
                      <div className={style.uploadFooter}>
                        <span>
                          <HiDownload color="#EF3125" size={19} />
                        </span>
                      </div>
                    </div>
                    <div className={style.uploadedDoc_list_item}>
                      <div className={style.uploadImg_name}>
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                          className={style.uploadImg}
                        />
                        <span className={style.uploadFile}>
                          Brief Report .pdf (1.5mb)
                        </span>
                      </div>
                      <div className={style.uploadFooter}>
                        <span>
                          <HiDownload color="#EF3125" size={19} />
                        </span>
                      </div>
                    </div>
                    <div className={style.uploadedDoc_list_item}>
                      <div className={style.uploadImg_name}>
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                          className={style.uploadImg}
                        />
                        <span className={style.uploadFile}>
                          Brief Report .pdf (1.5mb)
                        </span>
                      </div>
                      <div className={style.uploadFooter}>
                        <span>
                          <HiDownload color="#EF3125" size={19} />
                        </span>
                      </div>
                    </div>
                    <div className={style.uploadedDoc_list_item}>
                      <div className={style.uploadImg_name}>
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                          className={style.uploadImg}
                        />
                        <span className={style.uploadFile}>
                          Brief Report .pdf (1.5mb)
                        </span>
                      </div>
                      <div className={style.uploadFooter}>
                        <span>
                          <HiDownload color="#EF3125" size={19} />
                        </span>
                      </div>
                    </div>
                    <div className={style.uploadedDoc_list_item}>
                      <div className={style.uploadImg_name}>
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                          className={style.uploadImg}
                        />
                        <span className={style.uploadFile}>
                          Brief Report .pdf (1.5mb)
                        </span>
                      </div>
                      <div className={style.uploadFooter}>
                        <span>
                          <HiDownload color="#EF3125" size={19} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.eventContainer_right}>
            <div className={style.ticketContainer}>
              <h3 className={style.ticketContainer_title}>TICKETS</h3>
              <div className={style.ticketContainer_para}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div className={style.ticketType}>
                <SingleSelect containerStyle={{ flexDirection: "column" }}>
                  <TicketPurchase
                    title="VIP Ticket"
                    position="2"
                    price="₦20,000"
                  />
                  <TicketPurchase
                    title="General Admission"
                    position="2"
                    price="Free"
                  />
                </SingleSelect>
              </div>
            </div>
            <div className={style.ticketContainer}>
              <h3 className={style.ticketContainer_title}>Poll</h3>
              <div className={style.ticketContainer_para}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div className={style.ticketContainer_sec}>
                1. The actual market value of a right will differ from its
                theoretical value for all of the following reasons except for
              </div>
              <div className={style.ticketType}>
                <SingleSelect containerStyle={{ flexDirection: "column" }}>
                  <TicketPurchase
                    title="The size of the firms marginal tax rate"
                    position="2"
                  />
                  <TicketPurchase
                    title="The amount of transaction costs incurred"
                    position="2"
                  />
                  <TicketPurchase title="Investor Speculation" position="2" />
                  <TicketPurchase
                    title="The irregular exercise and sale of rights over the subscription period"
                    position="2"
                  />
                </SingleSelect>
                <div className={style.contdWrap}>
                  <button type="button" className={style.contd}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <div className={style.ticketContainer}>
              <h3 className={style.ticketContainer_title}>QUESTION</h3>
              <div className={style.ticketContainer_para}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>

              <div className={style.inputText}>
                <label className={style.commentLabel}>
                  {"What's the name of the company you represent? *"}
                </label>
                <textarea className={style.comment} rows={5}></textarea>
              </div>
            </div>
            <button className={style.checkoutBtn}>Check Out</button>
          </div>
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default EventDetails;
