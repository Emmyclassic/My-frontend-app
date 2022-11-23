import React, { useState } from "react";
import style from "./index.module.scss";
import { FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdSend, MdAttachFile } from "react-icons/md";
import { BsFillMicFill, BsArrowLeftShort } from "react-icons/bs";
import ChatCard, { CardGrid, SingleChat } from "../ChatCard";
import { ChatList } from "./dummyData";

const ChatListView = ({ list, setShowGrid }) => {
  return (
    <div onClick={() => setShowGrid(true)}>
      {list.map((item) => (
        <ChatCard key={item.id} name={item.abbr} from={item.from} />
      ))}
    </div>
  );
};

const ListSingleChat = ({ list }) => {
  return (
    <div className={style.single_chat_container}>
      {list.map((item) => (
        <SingleChat key={item.id} from={item.from} />
      ))}
    </div>
  );
};

const ChatGridView = ({ list, setSingleChat, setShowGrid }) => {
  return list.map((item) => (
    <CardGrid
      key={item.id}
      name={item.abbr}
      message={item.message}
      fullName={item.name}
      id={item.id}
      setSingleChat={setSingleChat}
      setShowGrid={setShowGrid}
    />
  ));
};

function Chat({ setShowChat }) {
  const [showGrid, setShowGrid] = useState(false);
  const [singleChat, setSingleChat] = useState(false);
  const [chatDetail, setChatDetail] = useState(null);
  console.log({ singleChat, setSingleChat });
  console.log({ chatDetail, setChatDetail });
  return (
    <div className={style.container_chat}>
      <div className={style.chat_body}>
        <div className={style.chat_body_content}>
          <div className={style.chat_header}>
            {!singleChat ? (
              <>
                <h5 className={style.chat_header_title}>Group Chat</h5>
                <div
                  className={style.close_chat}
                  onClick={() => setShowChat(false)}
                >
                  <FaTimes />
                </div>
              </>
            ) : (
              <div className={style.single_chat_header}>
                <div className={style.grid_container_desc}>
                  <div className={style.participant_card}>
                    <span className={style.participant_card_name}>
                      {chatDetail?.name || "AF"}
                    </span>
                  </div>
                  <div className={style.grid_container_detail}>
                    <p>{chatDetail?.fullName || "Ayodeji Fasore"}</p>
                  </div>
                </div>
                <div
                  className={style.close_chat}
                  onClick={() => setSingleChat(false)}
                >
                  <BsArrowLeftShort size={18} />
                </div>
              </div>
            )}
          </div>
          {!singleChat && (
            <div className={style.message_board}>
              <span>Message Board</span>
            </div>
          )}
          <div className={style.search_container}>
            <input placeholder="search..." />
            <div className={style.search_container_icon}>
              <FiSearch color="#7F8182" />
            </div>
          </div>
          {!showGrid && !singleChat && (
            <ChatListView list={ChatList} setShowGrid={setShowGrid} />
          )}
          {showGrid && !singleChat && (
            <ChatGridView
              list={ChatList}
              setSingleChat={setSingleChat}
              setShowGrid={setShowGrid}
            />
          )}
          {singleChat && <ListSingleChat list={ChatList} />}
        </div>
      </div>
      {!showGrid && (
        <div className={style.chat_footer}>
          <div className={style.chat_footer_container}>
            <div className={style.chat_footer_content}>
              <input placeholder="Type to write a message..." />
              <div className={style.chat_footer_content_icon}>
                <BsFillMicFill color="#7F8182" />
                <MdAttachFile color="#7F8182" />
              </div>
            </div>
            <div className={style.chat_footer_send}>
              <MdSend color="#fff" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
