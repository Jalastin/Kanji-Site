import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kanji_Creator from './Kanji_Creator';
import Kanji_Selector from './Kanji_Selector';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kanji_Selector/>} />
        <Route path="/play" element={<Kanji_Creator/>}/>
      </Routes>
    </Router>
  );
}
