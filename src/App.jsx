import LoginPage from './pages/LoginPage';
import InitialPage from './pages/InitialPage';
import RecoverPage from './pages/RecoverPage';
import CreateAccountPage from './pages/CreateAccountPage';
import { Routes, Route } from 'react-router-dom';

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<InitialPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route path="/create" element={<CreateAccountPage />} />
        <Route path="*" element={<h1>404, not found </h1>} />
      </Routes>
    </>
  )
}

export default App
