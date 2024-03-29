import React, {useState, useEffect} from "react";
import { isKatakana, isRomaji, toHiragana } from "wanakana";
import { useRecoilState } from "recoil";
import { counterStateAtom } from "./counterAtom.js";

const Word_Card = ({newIndex, words, id, kanji, word, pronunciation, meaning}) => {
    const [correct, setCorrect] = React.useState("Input the correct pronunciation here!");
    const [showmeaning, setShowMeaning] = React.useState("");
    const [counterstate, setCounterState] = useRecoilState(counterStateAtom);
    const [prev, setPrev] = useState("none");
    const [next, setNext] = useState("none");
    
    // useEffect(() => {
    //   setCounterState([...counterstate,id,]);
    // }, [])
    // console.log("counterstate: "+counterstate);
    useEffect(() => {
      console.log("words", words);
      // console.log("words[0][0]", words[0][0]);
      console.log(words[newIndex][0]);
      if (newIndex - 1 >= 0) {
        console.log(words[newIndex-1][0]);
        setPrev(words[newIndex-1][0]);
      }

      if (newIndex + 1 < words.length) {
        console.log(words[newIndex+1][0]);
        setNext(words[newIndex+1][0]);
      }

      // console.log(typeof counterstate);
      // console.log(Object.keys(counterstate).length);
      const len = Object.values(counterstate).length;
      const otoa = Object.values(counterstate);
      const i = otoa.findIndex( counterstate => counterstate === id);
      // console.log("counterstate: "+counterstate);
      // console.log("otoa: "+otoa);
      // console.log("id: "+id);
      // console.log("i: "+i);

      for (let index in otoa) {
        // if (otoa[index+1] === id) {
        //   setPrev(otoa[index]);
        // } else if (otoa[index-1] === id) {
        //   setNext(otoa[index]);
        // }

        // if (index + 1 == i) {
        //   setPrev(otoa[index]);
        // } else if (index - 1 == i) {
        //   setNext(otoa[index]);
        // }
      }

      // if (i === 0) {
      //   console.log("otoa[id+1]"+otoa[id+1]);
      //   setNext(otoa[id+1]);
      // } else if (i === (len-1)) {
      //   console.log("otoa[id-1]"+otoa[id-1]);
      //   setPrev(otoa[id-1]);
      // } else {
      //   console.log("otoa[id+1]"+otoa[id+1]);
      //   console.log("otoa[id-1]"+otoa[id-1]);
      //   setNext(otoa[id+1]);
      //   setPrev(otoa[id-1]);
      // }

      // const i = counterstate.indexOf(id);
      // if (i == 0) {
      //   setNext(counterstate[id+1]);
      // } else if (id == counterstate.length()-1) {
      //   setPrev(counterstate[id-1]);
      // } else {
      //   setNext(counterstate[id+1]);
      //   setPrev(counterstate[id-1]);
      // }
    })

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
            <div>Prev: {prev}</div>
            <div>Next: {next}</div>
            <br/>
        </div>
    )
}

export default Word_Card;