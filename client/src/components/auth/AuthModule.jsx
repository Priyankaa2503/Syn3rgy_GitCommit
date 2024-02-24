import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import BannerCar from "../../assets/electricCar.svg";
import { useNavigate } from "react-router-dom";

const AuthModule = ({ setIsLoggedIn, setUser }) => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/");
    }
  }, []);
  
  return (
    <div className="h-full w-full p-5 justify-center items-center flex">
      <div className="w-full h-full rounded-xl overflow-hidden flex bg-[#141414]">
        <div className="w-full h-full animate-fade-up animate-duration-[0.5s] flex flex-col justify-center items-center">
          {authType === "login" ? (
            <Login setAuthType={setAuthType} setUser={setUser} />
          ) : (
            <Register setAuthType={setAuthType} setUser={setUser} />
          )}
        </div>
        <div className="w-full z-10 h-full">
          <img
            src={BannerCar}
            alt="Saly"
            className="w-full animate-fade-up animate-duration-[0.5s] animate-delay-[0.75s] h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
