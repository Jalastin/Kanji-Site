import React, {useState, useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import { dbConfig } from "./dbConfig.js";

const Kanji_Card = ({id}) => {
    // https://firebase.google.com/docs/firestore/query-data/listen
    // https://benmcmahen.com/using-firebase-with-react-hooks/
    // console.log("id: " + id);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [kanji, setKanji] = React.useState([]);
    const [kanjiId, setKanjiId] = React.useState([]);
    const [wordmap, setWordmap] = React.useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(dbConfig, "kanji-site", id), (doc) => {
                setLoading(false);
                // console.log(doc.data());
                setKanji(doc.data());
                setKanjiId(doc.id);
                // https://stackoverflow.com/questions/40950546/react-js-right-way-to-iterate-over-object-instead-of-object-entries
                var newwordmap = new Map();
                console.log(doc.data().word);
                Object.entries(doc.data().word).map(([key,value]) => {
                    console.log(key);
                    console.log(value);
                    newwordmap.set(key, value);
                })
                setWordmap(newwordmap);
            },
            err => {
                setError(err);
            }
        )
        return () => unsubscribe()
    }, [id])
    
    // const words = wordmap.map((item) => 
    //     <div>Word: {item}</div>
    // );

    return (
        <div>
            <div>Kanji: {kanjiId}</div>
            <div>Stroke Order: {kanji.stroke_number}</div>
            <div>JLPT: {kanji.jlpt}</div>
            {typeof(kanji.word) !== 'undefined' && kanji.word != null ? Object.entries(kanji.word).map(([key,value]) => {
                    return (
                        <div>Word: {key}</div>
                    );
                }) : ""}
            <br/>
        </div>
    )
}

export default Kanji_Card;