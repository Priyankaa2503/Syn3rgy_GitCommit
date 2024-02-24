import React, { useState } from 'react'
import {
  Sidebar,
  MainModule
} from './components'

const App = () => {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0F0F0F] text-white font-pops">
      <Sidebar active={active} setActive={setActive} />
      <MainModule active={active} setActive={setActive} />
    </div>
  );
}

export default App