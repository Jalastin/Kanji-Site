import React, {useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { dbConfig } from "./dbConfig";
import { Link } from "react-router-dom";

const Kanji_Selector = () => {
    const [kanji, setKanji] = React.useState([]);

    // https://stackoverflow.com/questions/61178920/react-useeffect-to-get-firestore-data-once
    useEffect(() => {
        const getIds = async() => {
            const querySnapshot = await getDocs(collection(dbConfig, "kanji-site"));
            querySnapshot.forEach((doc) => {
                // https://thewebdev.info/2021/03/13/how-to-push-or-append-an-element-to-a-state-array-with-react-hooks/
                setKanji((oldkanji) => oldkanji.concat(doc.id));
                // console.log(doc.id, " => ", doc.data());
            });
        }
        getIds();
    }, [])


    // console.log(kanji);
    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    // https://www.robinwieruch.de/react-checkbox/

    const Checkbox = ({ label }) => {
    return (
        <label>
        <input type="checkbox" />
        {label}
        </label>
    );
    };

    const final = [];
    for (let item in kanji) {
        console.log(kanji[item]);
        // <input type="checkbox" id={kanji[item]} name={kanji[item]} value={kanji[item]}>{kanji[item]}</input>
        final.push(<Checkbox label={kanji[item]} />);
    }

    return (
        <div>
            {final}
            <Link to="/play">Play</Link>
        </div>
    )
}

export default Kanji_Selector;