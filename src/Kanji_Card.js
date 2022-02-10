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

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(dbConfig, "kanji-site", id), (doc) => {
                setLoading(false);
                // console.log(doc.data());
                setKanji(doc.data());
                setKanjiId(doc.id);
            },
            err => {
                setError(err);
            }
        )
        return () => unsubscribe()
    }, [id])
    
    return (
        <div>
            <div>Kanji: {kanjiId}</div>
            <div>Stroke Order: {kanji.stroke_number}</div>
            <div>JLPT: {kanji.jlpt}</div>
            <br/>
        </div>
    )
}

export default Kanji_Card;