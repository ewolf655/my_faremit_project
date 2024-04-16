"use client";
import { Input } from "@/components/controllers/field";
import AnimatedSVG from "@/components/helpers/Animat";
import AuthLayout from "@/components/layouts/AuthLayout";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = ({ closeModal, setIsOpen, handleSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultMessage = {
    Name: [],
    Password: [],
  };

  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState(defaultMessage);
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const handleLoginSuccess = (token) => {
    setLoading(false);
    toast("loged in successfully");
    localStorage.setItem("token", token);
    window.location.reload();
    navigate("/");
  };

  const [login] = useLoginMutation(); // destructure the mutation function
  const handleLoginError = (error) => {
    setError(error?.data?.message);
    if (error.data && error.data.message) {
      setError(error.data.message);
    }
    console.log(error);
    setLoading(false);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    const newErrorMessage = defaultMessage;

    if (!Name) {
      setInvalid(true);
      newErrorMessage.Name = ["This field is required"];
    }
    if (!Password) {
      setInvalid(true);
      newErrorMessage.Password = ["This field is required"];
    }
    if (!Name || !Password) {
      setErrorMessage(newErrorMessage);
      return;
    }
    try {
      setLoading(true);

      const name = Name.toLocaleLowerCase();
      const password = Password.toLocaleLowerCase();

      const response = await login({ name, password }).unwrap(); // call the mutation function with the form data
      dispatch(setUserData(response.data.user));

      handleLoginSuccess(response.token);

      localStorage.setItem("id", response.data.user._id);
      getUserFromResponse(response.data);
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <AuthLayout>
      <h3 className="text-center text-xl font-semibold text-gray-700 ">
        Welcome back
      </h3>
      <p className="text-center text-sm mt-2 mb-10">
        Login your Account With correct credentials
      </p>

      {error && (
        <div className="my-2 text-center w-full text-red-600 bg-red-100 py-2 rounded-md">
          {error}
        </div>
      )}
      <form className="space-y-5 w-full" onSubmit={handleLogin}>
        <div>
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Enter name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            error={errorMessage.Name}
          />
        </div>

        <div>
          <Input
            label="Password"
            id="Password"
            type="password"
            placeholder="Enter Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            error={errorMessage.Password}
          />
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="flex justify-evenly space-x-24">
            <button
              onClick={closeModal}
              type="button" // Change the type to "button"
              className="text-dark block w-1/2 rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full   items-center justify-center space-x-3 transform-gpu hover:bg-white rounded-lg text-white bg-gradient-to-r bg-[#554AE4] hover:from-[#554AE4] hover:to-[#554AE4] block text-center duration-300 active:scale-100  hover:scale-95 scale-100 active:outline-none px-3 lg:px-4 xl:px-8 font-medium lg:text-lg py-3   focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-500/50"
              disabled={loading}
            >
              {loading ? (
                <AnimatedSVG className="w-full h-8" />
              ) : (
                <span className="w-24 truncate md:-w-max"> Sign in</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
