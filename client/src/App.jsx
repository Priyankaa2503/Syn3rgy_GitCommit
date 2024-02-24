import React, { useEffect, useState } from "react";
import { Sidebar, MainModule } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthModule from "./components/auth/AuthModule";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [active, setActive] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [userData, setUserData] = useState(null);
  const [evData, setEVData] = useState(null);

  const [data, setData] = useState(null);

  const getData = () => {
    const id = JSON.parse(localStorage.getItem("user"))?.id;
    setUser(JSON.parse(localStorage.getItem("user")));
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        let d = res.data;
        setUserData(res.data);
        axios
          .get(`http://localhost:5000/evs/${id}`)
          .then((res) => {
            let s = { ...d, evs: res.data };
            setEVData(res.data);
            setData(s);
          })
          .catch((err) => {
            toast.error("Failed to fetch EV data");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getData();
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
                <Sidebar
                  active={active}
                  getData={getData}
                  data={data}
                  setActive={setActive}
                />
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
