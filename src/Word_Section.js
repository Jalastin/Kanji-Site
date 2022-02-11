import React, {useState, useEffect} from "react";

const Word_Section = ({word, pronunciation}) => {
    const [correct, setCorrect] = React.useState("Input the correct pronunciation here!");
    // https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
    // https://thewebdev.info/2021/09/25/how-to-get-input-text-field-values-when-enter-key-is-pressed-in-react/
    // https://stackoverflow.com/questions/37639122/using-event-target-with-react-components
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if (event.target.value == event.target.dataset.pronunciation) {
              console.log("user input: " + event.target.value);
              console.log("correct pronunciation: " + event.target.dataset.pronunciation);
              setCorrect("You were Correct!");
          } else {
            console.log("user input: " + event.target.value);
            console.log("correct pronunciation: " + event.target.dataset.pronunciation);
            setCorrect("You were Wrong.");
          }
        }
      }
    
    return (
        <div>
            <div>Word: {word}</div>
            <input type="text" data-pronunciation={pronunciation} onKeyDown={handleKeyDown}></input>
            <div>{correct}</div>
        </div>
    )
}

export default Word_Section;