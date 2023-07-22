import { useState } from "react";
import "@pages/popup/Popup.css";

const Popup = () => {
  const [value, setValue] = useState("");

  const handleFileUpload = () => {
    chrome.storage.sync.set({ transJSON: value }, function () {
      console.log("Dictionary saved ");
      alert("Dictionary saved");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-lime-400 mb-4">
            Hi!, this is the monkeytype-lengo extension!
          </h1>
          <input
            className="rounded mb-4 text-black"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add extension"
          />
          <button onClick={handleFileUpload}>Submit</button>
          <p className="mb-4">
            The way this works, is that you load a language JSON on the input
            below, this is simple word to word translation, so load a JSON with
            a word as a key and the translated word as a value. and example
            could be:
          </p>
          <a
            className="text-blue-800"
            href="https://github.com/hathibelagal/German-English-JSON-Dictionary/blob/master/english_german.json"
          >
            English to german JSON
          </a>
        </div>
      </header>
    </div>
  );
};

export default Popup;
