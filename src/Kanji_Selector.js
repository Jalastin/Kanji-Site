import React, {useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { dbConfig } from "./dbConfig";
import { Link } from "react-router-dom";

const Kanji_Selector = () => {
    const [kanji, setKanji] = React.useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [karray, setKarray] = React.useState([]);

    // https://stackoverflow.com/questions/61178920/react-useeffect-to-get-firestore-data-once
    useEffect(() => {
        const getIds = async() => {
            const querySnapshot = await getDocs(collection(dbConfig, "kanji-site"));
            var count = 0;
            querySnapshot.forEach((doc) => {
                // https://thewebdev.info/2021/03/13/how-to-push-or-append-an-element-to-a-state-array-with-react-hooks/
                setKanji((oldkanji) => oldkanji.concat(doc.id));
                // console.log(doc.id, " => ", doc.data());
                count += 1;
            });
            setCheckedState(new Array(count).fill(false));
            setKarray(new Array(count));
        }
        getIds();
    }, [])

    const handleOnChange = (position) => {
        // const updatedCheckedState = checkedState.map((item, index) =>
        //     index === position ? !item : item
        // );
        var updatedCheckedState = new Array(checkedState.length);
        for (let index in checkedState) {
            if (index === position) {
                updatedCheckedState[index] = !checkedState[index];
            } else {
                updatedCheckedState[index] = checkedState[index];
            }
        }

        setCheckedState(updatedCheckedState);
        // const updatedKarray = karray.map((item, index) => {
        //     if (checkedState[index]) {
        //         item = kanji[index];
        //     } else {
        //         item = null;
        //     }
        // });
        // const updatedKarray = karray.map((item, index) => 
        //     checkedState[index] ? kanji[index] : null
        // );
        var updatedKarray = new Array(karray.length);
        for (let index in karray) {
            if (checkedState[index]) {
                updatedKarray = kanji[index];
            } else {
                ;
            }
        }
        setKarray(updatedKarray);
        console.log("checkedState: " + checkedState);
        console.log("karray: " + karray);
      };

    // console.log(kanji);
    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    // https://www.robinwieruch.de/react-checkbox/

    const Checkbox = ({ label, index }) => {
    return (
        <label>
        <input 
            type="checkbox" 
            id={label}
            name={label}
            value={label}
            checked={checkedState[index]}
            onChange={() => handleOnChange(index)}
        />
        {label}
        </label>
    );
    };

    const final = [];
    for (let item in kanji) {
        // console.log(kanji[item]);
        // <input type="checkbox" id={kanji[item]} name={kanji[item]} value={kanji[item]}>{kanji[item]}</input>
        final.push(<Checkbox label={kanji[item]} index={item}/>);
    }

    return (
        <div>
            {final}
            <br/>
            <div>
                Current truths: {checkedState}
                <br/>
                Current selected: {karray}
            </div>
            <Link to="/play">Play</Link>
        </div>
    )
}

export default Kanji_Selector;