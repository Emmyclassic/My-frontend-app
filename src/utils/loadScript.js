const loadScript = (callback, url, id) => {
  const existingScript = document.getElementById(id);
  const root = document.getElementById("root");
  console.log("id", id, existingScript);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;
    script.id = id;
    root.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

function initFreshChat() {
  window.fcWidget.init({
    token: "527a559c-3089-4c3f-852d-b4c23ec26f79",
    host: "https://wchat.freshchat.com",
  });
}
function initialize(i, t) {
  i.getElementById(t)
    ? initFreshChat()
    : loadScript(initFreshChat, "https://wchat.freshchat.com/js/widget.js", t);
}
function initiateCall() {
  initialize(document, "Freshdesk Messaging-js-sdk");
}

console.log({ initiateCall });
export const loadChat = () => {
  // initiateCall();
  // document.addEventListener("load", initiateCall, !1);
};

export default loadScript;
