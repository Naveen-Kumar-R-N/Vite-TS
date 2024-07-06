import React, { useEffect } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {

  useEffect(() => {
      const handlePopState = () => {
          // Clear localStorage when the back button is pressed
          localStorage.clear();
      };

      window.addEventListener('popstate', handlePopState);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('popstate', handlePopState);
      };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/second" element={<RequireUser><SecondPage /></RequireUser>} />
    </Routes>
  );
};

const RequireUser: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default App;

