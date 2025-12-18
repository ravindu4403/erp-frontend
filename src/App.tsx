import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import MainMenu from './pages/MainMenu';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'error' | 'main'>('login');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = (): void => {
    if (username === 'User 01' && password === '123456') {
      setCurrentPage('main');
    } else {
      setCurrentPage('error');
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
      {currentPage === 'error' && (
        <ErrorPage
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleLogin={handleLogin}
        />
      )}
      {currentPage === 'main' && <MainMenu />}
      
      {/* Navigation buttons for demo */}
      <div className="fixed bottom-4 right-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage('login')}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('error')}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
        >
          Error
        </button>
        <button
          onClick={() => setCurrentPage('main')}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
        >
          Main
        </button>
      </div>
    </div>
  );
}

export default App;