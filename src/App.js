import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Kanji_Creator from './Kanji_Creator';
import Kanji_Selector from './Kanji_Selector';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Kanji_Selector/>} />
          <Route path="/play" element={<Kanji_Creator/>}/>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
