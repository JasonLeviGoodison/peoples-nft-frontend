import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletCard from './components/WalletCard';
import Entries from './components/Entries';
import Header from './components/Header';
import Home from './components/Home';
import NewSubmission from './components/NewSubmission';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/entries" element={<Entries metamask/>} />
          <Route path="/submit" element={<NewSubmission/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
