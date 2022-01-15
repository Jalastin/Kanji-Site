import React from "react";
import Kanji_Card from "./Kanji_Card.js";
import KanjiData from "./kanjidata.js";

const Kanji_Selector = () => {
    const KData = KanjiData;
    console.log(KData);
    return (
        <>
            <div>
                {KanjiData.map((kanji, key) => {
                    return (
                        <div key={key}>
                            <div>
                                {kanji.id}
                                <Kanji_Card kanji={kanji}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    ) 
}

export default Kanji_Selector;