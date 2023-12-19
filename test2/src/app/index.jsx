import { useState } from 'react';
import Header from '../components/header';
import Table from '../components/table';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function App() {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const themeClass = isDarkMode ? 'dark-theme' : 'light-theme';
  return (
    <div className={`app-container ${themeClass}`}>
      <DarkModeSwitch
        style={{ position: 'absolute', right: '20px', marginTop: '5px' }}
        checked={isDarkMode}
        onClick={toggleDarkMode}
        size={40}
      />
      <Header />
      <Table />
    </div>
  );
}

export default App;
