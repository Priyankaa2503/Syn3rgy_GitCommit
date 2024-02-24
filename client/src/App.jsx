import React, { useState } from 'react'
import {
  Sidebar,
  MainModule
} from './components'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthModule from "./components/auth/AuthModule";

const App = () => {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0F0F0F] text-white font-pops">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <Sidebar active={active} setActive={setActive} />
                <MainModule active={active} setActive={setActive} />
              </div>
            }
          />
          <Route
            path="/auth"
            element={<AuthModule active={active} setActive={setActive} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App