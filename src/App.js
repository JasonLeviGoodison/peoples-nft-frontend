import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletCard from './components/WalletCard';
import Entries from './components/Entries';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WalletCard/>} />
          <Route path="/entries" element={<Entries metamask/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
