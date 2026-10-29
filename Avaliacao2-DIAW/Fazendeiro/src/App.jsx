import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Votacao from './pages/Votacao';
import Resultado from './pages/Resultado';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Header fora do Routes: aparece em todas as páginas */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>

      <footer className="rodape">DIAW 2026, PUC Minas</footer>
    </BrowserRouter>
  );
}

export default App;