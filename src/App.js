import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from "recoil";
import Kanji_Card from './Kanji_Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          God Please work
        </p>
        <RecoilRoot>
          <Kanji_Card/>
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
