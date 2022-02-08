import React from "react";
import Kanji_Card from "./Kanji_Card";
import { Link } from "react-router-dom";

const Kanji_Creator = () => {

    // https://www.geeksforgeeks.org/how-to-perform-fetch-and-send-with-firestore-using-reactjs/
    const data = ["ー","二"];
    const final = [];
    for (let kanji in data) {
        final.push(<Kanji_Card id={data[kanji]}/>);
    }
    return (
        <div>
            {final}
            <Link to="/">Back</Link>
        </div>
    )
}

export default Kanji_Creator;