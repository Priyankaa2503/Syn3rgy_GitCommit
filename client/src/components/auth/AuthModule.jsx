import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Saly from "../../assets/Saly-10.png";
import { useNavigate } from "react-router-dom";

const AuthModule = ({ setIsLoggedIn, setUser }) => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      navigate("/main");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="h-full w-full p-5 justify-center items-center flex">
      <div className="w-full h-full animate-fade-up animate-duration-[0.5s] flex flex-col justify-center items-center">
        {authType === "login" ? (
          <Login setAuthType={setAuthType} setUser={setUser} />
        ) : (
          <Register setAuthType={setAuthType} setUser={setUser} />
        )}
      </div>
      <div className="w-full flex flex-col relative h-full bg-[#000842] rounded-lg">
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
        <div className="absolute animate-fade-up animate-duration-[0.5s] w-full h-full top-0 left-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1500">
            <defs>
              <rect
                stroke="#ffffff10"
                strokeWidth="0.5"
                width="1"
                height="1"
                id="s"
              />
              <pattern
                id="e"
                width="47"
                height="53"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(153 1000 750) scale(14.95) translate(-933.11 -699.83)"
              >
                <g fill="#0C21C120">
                  <use href="#s" x="2" y="5" />
                  <use href="#s" x="16" y="38" />
                  <use href="#s" x="46" y="42" />
                  <use href="#s" x="29" y="20" />
                </g>
              </pattern>
              <pattern
                id="f"
                width="59"
                height="71"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(153 1000 750) scale(14.95) translate(-933.11 -699.83)"
              >
                <g fill="#0C21C1">
                  <use href="#s" x="33" y="13" />
                  <use href="#s" x="27" y="54" />
                  <use href="#s" x="55" y="55" />
                </g>
              </pattern>
              <pattern
                id="g"
                width="139"
                height="97"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(153 1000 750) scale(14.95) translate(-933.11 -699.83)"
              >
                <g fill="#0C21C1">
                  <use href="#s" x="11" y="8" />
                  <use href="#s" x="51" y="13" />
                  <use href="#s" x="17" y="73" />
                  <use href="#s" x="99" y="57" />
                </g>
              </pattern>
            </defs>
            <rect fill="url(#a)" width="100%" height="100%" />
            <rect fill="url(#b)" width="100%" height="100%" />
            <rect fill="url(#h)" width="100%" height="100%" />
            <rect fill="url(#c)" width="100%" height="100%" />
            <rect fill="url(#d)" width="100%" height="100%" />
            <rect fill="url(#e)" width="100%" height="100%" />
            <rect fill="url(#f)" width="100%" height="100%" />
            <rect fill="url(#g)" width="100%" height="100%" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;
