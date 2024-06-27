import React, { useState } from 'react';
import BattleBoardTable from './components/BattleBoardTable';
import LoginPage from './pages/LoginPage';
import { MissionProvider } from './context/MissionContext';
import MissionForm from './components/MissionForm';
import { UnitProvider } from './context/UnitContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here
    // For simplicity, I'm just setting isLoggedIn to true
    setIsLoggedIn(true);
  };

  return (
    <>
    <MissionProvider>
      <UnitProvider>
      {isLoggedIn ? (
        // <BattleBoardTable />
        <MissionForm/>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      </UnitProvider>
      </MissionProvider>
      
    </>
  );
}

export default App;
