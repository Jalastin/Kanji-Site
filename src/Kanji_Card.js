import React, {useState, useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import { dbConfig } from "./dbConfig.js";
import Word_Card from "./Word_Card.js";
import { useRecoilState } from "recoil";
import { counterStateAtom } from "./counterAtom.js";

const Kanji_Card = ({id}) => {
    // https://firebase.google.com/docs/firestore/query-data/listen
    // https://benmcmahen.com/using-firebase-with-react-hooks/
    // console.log("id: " + id);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [kanji, setKanji] = React.useState([]);
    const [kanjiId, setKanjiId] = React.useState([]);
    const [counterstate, setCounterState] = useRecoilState(counterStateAtom);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(dbConfig, "kanji-site", id), (doc) => {
                setLoading(false);
                // console.log(doc.data());
                setKanji(doc.data());
                setKanjiId(doc.id);
                // https://stackoverflow.com/questions/40950546/react-js-right-way-to-iterate-over-object-instead-of-object-entries
            },
            err => {
                setError(err);
            }
        )
        return () => unsubscribe()
    }, [id])

    return (
        <div>
            {/* <div>Stroke Order: {kanji.stroke_number}</div>
            <div>JLPT: {kanji.jlpt}</div> */}
            {typeof(kanji.word) !== 'undefined' && kanji.word != null ? Object.entries(kanji.word).map(([key,value], newIndex, words) => {
                    // console.log("key", key);
                    // console.log("value", value);
                    // console.log("index", newIndex);
                    if (counterstate.includes(key) === false) {
                        // https://github.com/facebookexperimental/Recoil/issues/619
                        setCounterState([...counterstate,key,]);
                        console.log("counterstate: "+counterstate);
                    }
                    return (
                        <Word_Card key={newIndex} newIndex={newIndex} words={words} id={key} kanji={kanjiId} word={key} pronunciation={value.pronunciation} meaning={value.meaning}/>
                    );
                }) : ""}
            <br/>
        </div>
    )
}

export default Kanji_Card;