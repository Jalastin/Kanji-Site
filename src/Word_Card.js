import React, {useState, useEffect} from "react";
import { isKatakana, isRomaji, toHiragana } from "wanakana";

const Word_Card = ({id, kanji, word, pronunciation, meaning}) => {
    const [correct, setCorrect] = React.useState("Input the correct pronunciation here!");
    const [showmeaning, setShowMeaning] = React.useState("");

    // https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
    // https://thewebdev.info/2021/09/25/how-to-get-input-text-field-values-when-enter-key-is-pressed-in-react/
    // https://stackoverflow.com/questions/37639122/using-event-target-with-react-components
    const handleKeyDown = (event) => {
        var v = event.target.value;
        const p = event.target.dataset.pronunciation;
        if (isKatakana(v) || isRomaji(v)) {
            v = toHiragana(v);
        }

        if (event.key === 'Enter') {
          if (v == p) {
              console.log("user input: " + v);
              console.log("correct pronunciation: " + p);
              setCorrect("You were Correct!");
          } else {
            console.log("user input: " + v);
            console.log("correct pronunciation: " + p);
            setCorrect("You were Wrong.");
          }
        }
    }
    
    const showMeaning = () => {
      if (showmeaning === "") {
        setShowMeaning(meaning);
      } else {
        setShowMeaning("");
      }
    }
    
    return (
        <div>
            <div>Id: {id}</div>
            <div>Kanji: {kanji}</div>
            <div>Word: {word}</div>
            <input type="text" data-pronunciation={pronunciation} onKeyDown={handleKeyDown}></input>
            <div>{correct}</div>
            <button onClick={showMeaning}>Show Meaning</button>
            <div>{showmeaning}</div>
        </div>
    )
}

export default Word_Card;