import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { dbConfig } from "./dbConfig";
import Kanji_Card from "./Kanji_Card";

const Kanji_Selector = () => {
    // https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore/52101894
    // https://stackoverflow.com/questions/61615287/get-all-documents-in-firebase-collection-react
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
    //let data = [];

    // window.addEventListener('load', () => {
    //     kanjiSelect();
    //   });

    // async function kanjiSelect() {
    //     const querySnapshot = await getDocs(collection(dbConfig, "kanji-site"));
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc);
    //         data.push(doc.id);
    //     });
    // }
    // console.log(data);
    
    // data.forEach(function (item,index) {
    //     return (
    //         <div>
    //             <Kanji_Card id={item}/>
    //         </div>
    //     )
    // })

    // return data.level.map((item,index) => {
    //     <div>
    //         <Kanji_Card id={item}/>
    //     </div>
    // })

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