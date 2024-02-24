import React, { useEffect, useRef, useState } from "react";
import Icons from "../Icons";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = ({ setAuthType, setUser }) => {
  const [isActive, setIsActive] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password || !rePassword) {
      return toast.error("Please fill all the fields");
    }
    if (password !== rePassword) {
      return toast.error("Passwords do not match");
    }
    axios
      .post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        isAdmin: false,
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid credentials");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target) &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target) &&
        nameRef.current &&
        !nameRef.current.contains(event.target) &&
        rePasswordRef.current &&
        !rePasswordRef.current.contains(event.target)
      ) {
        setIsActive("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef, passwordRef, nameRef, rePasswordRef, setIsActive]);

  return (
    <div className="h-full w-full flex px-8 flex-col justify-center items-center">
      <div className="w-full px-8 text-2xl text-[#44DDA0] font-bold">
        Sign Up
      </div>
      <div className="w-full mt-5 text-gray-400 px-8 text-sm">
        If you already have an account
      </div>
      <div className="w-full mt-1 text-sm px-8 font-semibold text-[#44DDA0]">
        <div
          className="cursor-pointer hover:underline w-fit"
          onClick={() => {
            setAuthType("login");
          }}
        >
          Log in here
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-8 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Name</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "name" ? "border-[#44DDA0]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("name");
          }}
          ref={nameRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="name"
              width="20"
              height="20"
              color={isActive === "name" ? "#44DDA0" : "#676767"}
            />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full bg-transparent text-white overflow-hidden focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Email</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "email" ? "border-[#44DDA0]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("email");
          }}
          ref={emailRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="email"
              width="20"
              height="20"
              color={isActive === "email" ? "#44DDA0" : "#676767"}
            />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent text-white overflow-hidden focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Password</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "password" ? "border-[#44DDA0]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("password");
          }}
          ref={passwordRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="password"
              width="20"
              height="20"
              color={isActive === "password" ? "#44DDA0" : "#676767"}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent text-white overflow-hidden focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Re-Password</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "repassword" ? "border-[#44DDA0]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("repassword");
          }}
          ref={rePasswordRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="password"
              width="20"
              height="20"
              color={isActive === "repassword" ? "#44DDA0" : "#676767"}
            />
          </div>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="w-full bg-transparent text-white overflow-hidden focus:outline-none"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
      </div>
      <div className="px-8 w-full mt-6">
        <Button icon={"login"} onClick={() => handleRegister()}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
