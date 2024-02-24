import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Saly from "../../assets/Saly-10.png";
import { useNavigate } from "react-router-dom";

const AuthModule = ({ setIsLoggedIn, setUser }) => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-5 justify-center items-center flex">
      <div className="w-full h-full rounded-xl overflow-hidden flex bg-white">
        <div className="w-full h-full animate-fade-up animate-duration-[0.5s] flex flex-col justify-center items-center">
          {authType === "login" ? (
            <Login setAuthType={setAuthType} setUser={setUser} />
          ) : (
            <Register setAuthType={setAuthType} setUser={setUser} />
          )}
        </div>
        <div className="w-full flex flex-col relative h-full bg-gradient-to-r from-[#44DDA0] to-[#84e1bc] rounded-lg">
          <div className="w-full z-10 h-[70%]">
            <img
              src={Saly}
              alt="Saly"
              className="w-full animate-fade-up animate-duration-[0.5s] animate-delay-[0.75s] h-full object-contain"
            />
          </div>
          <div className="w-full h-[30%] animate-fade-up animate-duration-[0.5s] animate-delay-[1.25s] flex justify-center items-center">
            <div className="w-full text-white text-3xl font-bold text-center">
              Welcome to Essay Analyser
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
