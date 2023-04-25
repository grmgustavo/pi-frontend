import LoginPage from './pages/LoginPage';
import InitialPage from './pages/InitialPage';
import { Routes, Route } from 'react-router-dom';

function App () {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<InitialPage />} />
    </Routes>
  );
}

export default App;
