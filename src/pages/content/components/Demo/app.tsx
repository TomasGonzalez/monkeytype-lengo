import { useCallback, useEffect, useRef, useState } from "react";
const isMonkeytype = window.location.href === "https://monkeytype.com/";

export default function App() {
  const [currentSelectedWord, setCurrentSelectedWord] = useState(null);
  const [translationJson, setTranslationJSON] = useState(null);
  const translationElement = useRef(null);

  const onKeydown = useCallback(() => {
    const wordElement = document.querySelector(".word.active");
    setCurrentSelectedWord(wordElement.textContent);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeydown, false);
    if (isMonkeytype) {
      chrome.storage.sync.get(["transJSON"], function (items) {
        if (chrome.runtime.lastError) {
          console.log("Error: ", chrome.runtime.lastError);
        } else {
          console.log("Settings retrieved", items);
          fetch(items.transJSON).then((request) => {
            console.log(request, "this is request");
          });
        }
      });
    }
    return () => {
      document.removeEventListener("keydown", onKeydown, false);
    };
  }, []);

  useEffect(() => {
    if (translationElement.current)
      document
        .getElementById("typingTest")
        .appendChild(translationElement.current);
  }, [translationElement]);

  useEffect(() => {
    console.log(
      currentSelectedWord,
      "this is the current selected word on useEffect"
    );
  }, [currentSelectedWord]);

  if (!isMonkeytype) return null;

  return (
    <div ref={translationElement}>
      {currentSelectedWord || "The translated work will show here"}
    </div>
  );
}
