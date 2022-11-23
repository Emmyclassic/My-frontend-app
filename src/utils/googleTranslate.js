export const googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    {
      includedLanguages: "en,fr,pt,ar,sw",
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
};

export const appendGoogleTranslateScript = () => {
  const addScript = document.createElement("script");
  addScript.setAttribute(
    "src",
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  );
  document.body.appendChild(addScript);
  window.googleTranslateElementInit = googleTranslateElementInit;
};
