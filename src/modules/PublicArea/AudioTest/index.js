import { Checkbox, Modal } from "antd";
import React, { useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { useHistory } from "react-router";
import style from "./index.module.scss";

const AudioTest = () => {
  const history = useHistory();
  const [toggleAudioTest, setToggleAudioTest] = useState(true);
  return (
    <div className={style.container}>
      <Modal
        onCancel={() => setToggleAudioTest(false)}
        destroyOnClose
        closable={false}
        bodyStyle={{
          backgroundColor: "rgba(0,0,0, 0.45)",
          padding: 0,
          borderRadius: "15px",
        }}
        visible={toggleAudioTest}
        // onOk={() => setVisible(false)}

        footer={null}
        header={null}
      >
        <div className={style.audioWrapper}>
          <div className={style.audioContainer}>
            <div className={style.audioBox}>
              <div className={style.audioIconBox}>
                <div className={style.outerIconBox}>
                  <span className={style.innerBox}>
                    <GiSoundWaves size={80} color="#2f89fe" />
                  </span>
                </div>
              </div>
            </div>
            <div className={style.btnBox}>
              <button
                onClick={() => history.push("/waiting")}
                className={`${style.audioBtn} ${style.computerAudio}`}
              >
                Join with Computer Audio
              </button>
              <button className={`${style.audioBtn} ${style.micAudio}`}>
                Test Speakers and Microphone
              </button>
            </div>
            <div className={style.checkBoxWrap}>
              <Checkbox style={{ backgroundColor: "transparent" }}>
                <span className={style.acceptCond}>
                  Join meetings with computer audio automatically
                </span>
              </Checkbox>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AudioTest;
