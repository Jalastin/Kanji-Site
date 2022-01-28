import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from "recoil";
import Kanji_Card from './Kanji_Card';
import Kanji_Selector from './Kanji_Selector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Scuffed Kanji Flashcards PepeL
        </p>
        <RecoilRoot>
          <Kanji_Selector/>
          {/* <Kanji_Card id="ー"/> */}
        </RecoilRoot>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
