import React, { useEffect, useState } from "react";
import { Sidebar, MainModule } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthModule from "./components/auth/AuthModule";
import axios from "axios";

const App = () => {
  const [active, setActive] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const id = JSON.parse(localStorage.getItem("user")).id;
      setUser(JSON.parse(localStorage.getItem("user")));
      axios
        .get(`http://localhost:5000/user/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0F0F0F] text-white font-pops">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <Sidebar active={active} data={data} setActive={setActive} />
                <MainModule
                  user={user}
                  setUser={setUser}
                  active={active}
                  setIsLoggedIn={setIsLoggedIn}
                  data={data}
                />
              </div>
            }
          />
          <Route
            path="/auth"
            element={
              <AuthModule setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
