import {doc, getDoc} from "firebase/firestore";
import { dbConfig } from "./dbConfig.js";

export async function getKanjiCard(id) {
    const docRef = doc(dbConfig, "kanji-site", id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Console log: " + docSnap.data());
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("Kanji Card does not exist!");
        }
    } catch(e) {
        console.log("error with getKanjiCard: ", e);
    }
}