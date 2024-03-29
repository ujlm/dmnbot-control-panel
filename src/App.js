import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/main.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ControlPanel from './pages/ControlPanel';
import FinishUpload from './pages/FinishUpload';

function App() {    
  return (
    <div className="App">
      <Routes>
      <Route
          exact
          path="/SignUp"
          element={<SignUp />} />
      <Route
        exact
        path="/SignIn"
        element={<SignIn />} />
        <Route
          exact
          path="/"
          element={<ControlPanel />} />
        <Route
          exact
          path="/FinishUpload"
          element={<FinishUpload />} />
      </Routes>
    </div>
  );
}

export default App;
