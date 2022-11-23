import { Checkbox, Spin, Tooltip } from "antd";
import React from "react";
import { MdFileUpload } from "react-icons/md";
import shortid from "shortid";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import FormInput from "../../../../../components/FormInput";
import style from "../index.module.scss";
import { DownloadCsv } from "./Attendee";

const AttendeeProxyForm = () => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        placeholder="Enter participant name..."
        labelTitle="Participant Name"
        inputType="text"
        isRequired={false}
        errors={errors}
        name="participantName"
        watch={watch}
        register={register("participantName")}
        showCount={false}
      />
      <FormInput
        placeholder="Enter Account Number"
        labelTitle="Participant Account Number"
        inputType="text"
        isRequired={false}
        errors={errors}
        name="accountNumber"
        watch={watch}
        maxLength={10}
        register={register("accountNumber")}
        showCount
      />
      <FormInput
        placeholder="Enter voters right"
        labelTitle="Participant Voting rights (Holdings/Units)"
        inputType="number"
        isRequired={false}
        errors={errors}
        name="votersRight"
        watch={watch}
        maxLength={100}
        min={0}
        register={register("votersRight")}
        showCount={false}
      />
      <FormInput
        placeholder="Enter voters right"
        labelTitle="Nominated Proxy Name"
        inputType="text"
        isRequired={false}
        errors={errors}
        name="nominatedProxy"
        watch={watch}
        maxLength={100}
        register={register("nominatedProxy")}
        showCount={false}
      />

      <div className={style.form__input_wrap}>
        {resolutionSelector.length > 0 &&
          resolutionSelector.map((item, idx) => (
            <MemoResolutionPicker
              key={shortid.generate()}
              item={item}
              idx={idx}
              selectedValue={selectedValue}
              data={resolutionSelector}
              resolutions={resolutions}
              resolutionHandler={(e) => dispenseCallback(e.target.value, item)}
              addNewResolution={() => addNewResolution(idx + 1)}
            />
          ))}
      </div>
      <div className={style.form__input_wrap}>
        {electionSelector.length > 0 &&
          electionSelector.map((item, idx) => (
            <MemoElectionPicker
              key={shortid.generate()}
              item={item}
              idx={idx}
              selectedValue={selectedValue}
              data={electionSelector}
              elections={elections}
              resolutionHandler={(e, idx) =>
                electionHandler(e.target.value, item, idx)
              }
              addNewElection={addNewElectionCb}
              objElection={objElection}
            />
          ))}
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="firstName" className={style.form__input_label}>
            <Checkbox onChange={handleProxySetup}>
              <div className={style.form__label_text}>
                <div className={style.form__label_title}>Setup proxy form</div>
                <p className={style.form__label_content}>
                  Setup the proxy form for this event.
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>

      <div className={style.btnGroup}>
        <div className={style.btnGroup_left}>
          <button
            type="submit"
            disabled={proxy.loading}
            className={`${style.btnGroup_item} ${style.btnGroup_item_bg}`}
          >
            {proxy.loading ? <Spin size="large" color="#fff" /> : "Add Proxy"}
          </button>
          {proxy.data && (
            <AlertResponse
              status={proxy.status}
              data={proxy.data}
              onClose={onClose}
              message={proxy.message}
            />
          )}
        </div>
        <div className={style.uploadOption}>Or</div>
        <div className={style.btnGroup_right}>
          <Tooltip placement="right" title="Upload excel">
            <button
              type="button"
              className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
            >
              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={handleFileUpload}
              />
              <MdFileUpload className={style.uploadIcon} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Download Attendee template">
            <DownloadCsv
              data={proxies}
              csvHeader={[
                { label: "Participant Name", key: "participant_name" },
                {
                  label: "Participant Account Number",
                  key: "account_number",
                },
                {
                  label: "Nominated Proxy Name",
                  key: "nominated_proxy_name",
                },
                { label: "Voting Right", key: "voting_right" },
                { label: "ResolutionId", key: "id" },
              ]}
              csvFileName="proxy.csv"
            />
          </Tooltip>
        </div>
      </div>
    </form>
  );
};
