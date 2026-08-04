"use strict";

const translations = {
  en: {
    documentTitle: "WhoRides? - Find your next ride",
    metaDescription:
      "Discover riders nearby, join spontaneous rides, or start your own.",
    heroAlt: "A motorcyclist ready for the next ride",
    languageLabel: "Choose language",
    comingSoon: "Coming soon",
    eyebrow: "MOTORCYCLE COMMUNITY",
    headlineFirst: "The road is calling.",
    headlineSecond: "Find your crew.",
    description:
      "Discover riders nearby, join spontaneous rides, or start your own.",
    joinCommunity: "Join the community",
    contact: "Contact us",
    storeSectionLabel: "Mobile application stores",
    appStoreAlt: "Download on the App Store",
    googlePlayAlt: "Get it on Google Play",
    appStoreBadge: "./assets/app-store-badge.svg",
    googlePlayBadge: "./assets/google-play-badge.png"
  },

  pl: {
    documentTitle: "WhoRides? - Znajdź ekipę na wspólną trasę",
    metaDescription:
      "Znajdź motocyklistów w pobliżu, dołącz do spontanicznego wypadu albo zorganizuj własny.",
    heroAlt: "Motocyklistka gotowa na kolejną trasę",
    languageLabel: "Wybierz język",
    comingSoon: "Już wkrótce",
    eyebrow: "SPOŁECZNOŚĆ MOTOCYKLOWA",
    headlineFirst: "Droga wzywa.",
    headlineSecond: "Znajdź ekipę.",
    description:
      "Znajdź motocyklistów w pobliżu, dołącz do spontanicznego wypadu albo zorganizuj własny.",
    joinCommunity: "Dołącz do społeczności",
    contact: "Kontakt",
    storeSectionLabel: "Sklepy z aplikacjami mobilnymi",
    appStoreAlt: "Pobierz w App Store",
    googlePlayAlt: "Pobierz z Google Play",
    appStoreBadge: "./assets/app-store-badge-pl.svg",
    googlePlayBadge: "./assets/google-play-badge-pl.png"
  }
};

const supportedLanguages = Object.keys(translations);

const metaDescription = document.querySelector(
  'meta[name="description"]'
);

const appStoreBadge = document.querySelector("#app-store-badge");
const googlePlayBadge = document.querySelector("#google-play-badge");

const languageMenu = document.querySelector(".language-menu");
const languageTrigger = document.querySelector("#language-trigger");
const languageDropdown = document.querySelector("#language-dropdown");
const currentLanguageCode = document.querySelector(
  "#current-language-code"
);
const languageChoices = document.querySelectorAll("[data-language]");

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("whorides-language");

  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return "en";
}

function setLanguageMenuOpen(isOpen) {
  languageDropdown.hidden = !isOpen;
  languageMenu.classList.toggle("is-open", isOpen);
  languageTrigger.setAttribute("aria-expanded", String(isOpen));
}

function applyLanguage(language) {
  const selectedLanguage = supportedLanguages.includes(language)
    ? language
    : "en";

  const copy = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = copy.documentTitle;
  metaDescription.setAttribute("content", copy.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (Object.prototype.hasOwnProperty.call(copy, key)) {
      element.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;

    if (Object.prototype.hasOwnProperty.call(copy, key)) {
      element.setAttribute("alt", copy[key]);
    }
  });

  document
    .querySelectorAll("[data-i18n-title]")
    .forEach((element) => {
      const key = element.dataset.i18nTitle;

      if (Object.prototype.hasOwnProperty.call(copy, key)) {
        element.setAttribute("title", copy[key]);
      }
    });

  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach((element) => {
      const key = element.dataset.i18nAriaLabel;

      if (Object.prototype.hasOwnProperty.call(copy, key)) {
        element.setAttribute("aria-label", copy[key]);
      }
    });

  appStoreBadge.setAttribute("src", copy.appStoreBadge);
  googlePlayBadge.setAttribute("src", copy.googlePlayBadge);

  currentLanguageCode.textContent = selectedLanguage.toUpperCase();
  languageTrigger.setAttribute("aria-label", copy.languageLabel);

  languageChoices.forEach((choice) => {
    const isActive = choice.dataset.language === selectedLanguage;

    choice.classList.toggle("is-active", isActive);
    choice.setAttribute("aria-current", isActive ? "true" : "false");
  });

  localStorage.setItem("whorides-language", selectedLanguage);
  setLanguageMenuOpen(false);
}

languageTrigger.addEventListener("click", () => {
  setLanguageMenuOpen(languageDropdown.hidden);
});

languageChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    applyLanguage(choice.dataset.language);
  });
});

document.addEventListener("click", (event) => {
  if (!languageMenu.contains(event.target)) {
    setLanguageMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setLanguageMenuOpen(false);
    languageTrigger.focus();
  }
});

applyLanguage(getInitialLanguage());
