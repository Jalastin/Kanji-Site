import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { dbConfig } from "./dbConfig";
import Kanji_Card from "./Kanji_Card";

const Kanji_Selector = () => {

    // https://www.geeksforgeeks.org/how-to-perform-fetch-and-send-with-firestore-using-reactjs/
    const data = ["ー","二"];
    const final = [];
    for (let kanji in data) {
        final.push(<Kanji_Card id={data[kanji]}/>);
    }
    return (
        <div>
            {final}
        </div>
    )
}

export default Kanji_Selector;