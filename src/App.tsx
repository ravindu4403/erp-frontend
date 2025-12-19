import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MainMenu from './pages/MainMenu';
import PosMainMenu from './pages/PosMainMenu';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'error' | 'main' | 'pos'>('login');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = () => {
    if (username === 'demo' && password === '1234') {
      setCurrentPage('main');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div>
      {currentPage === 'login' && (
        <LoginPage
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleLogin={handleLogin}
        />
      )}

      {currentPage === 'main' && (
        <MainMenu goToPage={(page) => setCurrentPage(page)} />
      )}

      {currentPage === 'pos' && (
        <PosMainMenu goBack={() => setCurrentPage('main')} />
      )}
    </div>
  );
}

export default App;
