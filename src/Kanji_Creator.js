import React from "react";
import Kanji_Card from "./Kanji_Card";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kanjiStateAtom } from "./kanjiAtom";

const Kanji_Creator = () => {
    const [kanjistate, setKanjiState] = useRecoilState(kanjiStateAtom);
    console.log("kanjistate: " + kanjistate);

    // https://www.geeksforgeeks.org/how-to-perform-fetch-and-send-with-firestore-using-reactjs/
    const final = [];
    for (let kanji in kanjistate) {
        final.push(<Kanji_Card id={kanjistate[kanji]}/>);
    }
    return (
        <div>
            {final}
            <Link to="/">Back</Link>
        </div>
    )
}

export default Kanji_Creator;