import React from "react";
import { useRecoilState } from 'recoil';
import { kanjiStateAtom } from "./kanjiAtom.js"; 
import { getKanjiCard } from "./getKanjiCard.js";

const Kanji_Card = ({id}) => {
    console.log("id: " + id);
    const [kanji, setKanji] = useRecoilState(kanjiStateAtom);

    async function setKanjiState() {
        const kanjiData = await getKanjiCard(id);
        console.log("kanjiData: " + kanjiData);
        setKanji(kanjiData);
    }
    
    return (
        <div>
            <button onClick={setKanjiState}> getKanjiCard Button</button>
            Stroke Order: {kanji.stroke_number}
        </div>
    )
}

export default Kanji_Card;