import React, {useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { dbConfig } from "./dbConfig";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kanjiStateAtom } from "./kanjiAtom";
import { counterStateAtom } from "./counterAtom";

const Kanji_Selector = () => {
    const [kanji, setKanji] = React.useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [karray, setKarray] = React.useState([]);
    const [kanjistate, setKanjiState] = useRecoilState(kanjiStateAtom);
    const [counterstate, setCounterState] = useRecoilState(counterStateAtom);
    const [checked, setChecked] = useState(false);

    // https://stackoverflow.com/questions/61178920/react-useeffect-to-get-firestore-data-once
    useEffect(() => {
        const getIds = async() => {
            var newCheckedState = [];
            var newKarray = [];
            const querySnapshot = await getDocs(collection(dbConfig, "kanji-site"));
            querySnapshot.forEach((doc) => {
                // https://thewebdev.info/2021/03/13/how-to-push-or-append-an-element-to-a-state-array-with-react-hooks/
                setKanji((oldkanji) => oldkanji.concat(doc.id));
                // console.log(doc.id, " => ", doc.data());
                
                // console.log("kanjistate: " + kanjistate);
                if (kanjistate.includes(doc.id)) {
                    newCheckedState.push(true);
                    newKarray.push(doc.id);
                } else {
                    newCheckedState.push(false);
                }
            });
            setCheckedState(newCheckedState);
            setKarray(newKarray);
        }
        getIds();
    }, [])

    const handleOnChange = (position) => {
        var updatedCheckedState = new Array(checkedState.length);
        for (let index in checkedState) {
            if (index === position) {
                // console.log(checkedState[index] + " is now " + !checkedState[index]);
                updatedCheckedState[index] = !checkedState[index];
            } else {
                updatedCheckedState[index] = checkedState[index];
            }
        }
        // console.log("updatedCheckedState: " + updatedCheckedState);
        
        var updatedKarray = [];
        for (let index in updatedCheckedState) {
            // console.log("cur ucs: " + updatedCheckedState[index]);
            if (updatedCheckedState[index] == true) {
                // console.log("index " + index + " is true");
                updatedKarray.push(kanji[index]);
            }
        }
        // console.log("updatedKarray: " + updatedKarray);

        setCheckedState(updatedCheckedState);
        // console.log("hello?");
        setKarray(updatedKarray);
        // console.log("checkedState: " + checkedState);
        // console.log("karray: " + karray);
    };
    
    const uncheckAll = () => {
        const resetCheckedState = new Array(checkedState.length).fill(false);
        setCheckedState(resetCheckedState);
        setKarray([]);
        setChecked(false);
    }

    const checkAll = () => {
        var filledKarray = [];
        for (let index in kanji) {
            filledKarray.push(kanji[index]);
        }
        const fillCheckedState = new Array(checkedState.length).fill(true);
        setCheckedState(fillCheckedState);
        setKarray(filledKarray);
        setChecked(true);
    }

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
        final.push(<Checkbox label={kanji[item]} index={item}/>);
    }

    const setStates = () => {
        setKanjiState(karray);
        setCounterState(0);
    }

    return (
        <div>
            {final}
            <br/>
            <div>
                Current selected: {karray}
            </div>
            {checked ?
                <button onClick={uncheckAll}> Uncheck All </button>
            :
                <button onClick={checkAll}> Check All </button>
            }
            {/* <button onClick={checked ? uncheckAll : checkAll}> Check/Uncheck All </button> */}
            <Link to="/play" onClick={setStates}>Play</Link>
        </div>
    )
}

export default Kanji_Selector;