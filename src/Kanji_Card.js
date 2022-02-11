import React, {useState, useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import { dbConfig } from "./dbConfig.js";
import Word_Section from "./Word_Section.js";

const Kanji_Card = ({id}) => {
    // https://firebase.google.com/docs/firestore/query-data/listen
    // https://benmcmahen.com/using-firebase-with-react-hooks/
    // console.log("id: " + id);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [kanji, setKanji] = React.useState([]);
    const [kanjiId, setKanjiId] = React.useState([]);
    const [correct, setCorrect] = React.useState("Input the correct pronunciation here!");

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(dbConfig, "kanji-site", id), (doc) => {
                setLoading(false);
                // console.log(doc.data());
                setKanji(doc.data());
                setKanjiId(doc.id);
                // https://stackoverflow.com/questions/40950546/react-js-right-way-to-iterate-over-object-instead-of-object-entries
                // console.log(doc.data().word);
                // Object.entries(doc.data().word).map(([key,value]) => {
                //     console.log(key);
                //     console.log(value);
                // })
            },
            err => {
                setError(err);
            }
        )
        return () => unsubscribe()
    }, [id])

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
            <div>Kanji: {kanjiId}</div>
            <div>Stroke Order: {kanji.stroke_number}</div>
            <div>JLPT: {kanji.jlpt}</div>
            {typeof(kanji.word) !== 'undefined' && kanji.word != null ? Object.entries(kanji.word).map(([key,value]) => {
                    return (
                        <Word_Section word={key} pronunciation={value.pronunciation}/>
                    );
                }) : ""}
            <br/>
        </div>
    )
}

export default Kanji_Card;