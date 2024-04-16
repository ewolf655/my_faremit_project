import {
  CountrySelect,
  PhoneNumberInput1,
} from "@/components/controllers/Countries";
import AnimatedSVG from "@/components/helpers/Animat";
import AuthLayout from "@/components/layouts/AuthLayout";
import React, { useState } from "react";
// eslint-disable-next-line import/order
import { HiEye } from "react-icons/hi";
import { HiEyeSlash } from "react-icons/hi2";
// eslint-disable-next-line import/order
import { Link } from "react-router-dom";
import { toast } from "sonner";

// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";

// eslint-disable-next-line no-unused-vars
export const RegistrationForm = ({
  closeModal,
  setactive,
  handleThemeChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setErrors([]);
  }, 50000);
  const [Signup] = useSignupMutation();
  const allowedCountries = [
    "CA",
    "GB",
    "US",
    "DE",
    "FR",
    "NL",
    "NO",
    "IE",
    "ES",
    "SE",
    "DK",
    "PL",
    "IT",
    "LT",
    "LV",
    "EE",
    "BE",
  ];
  const handleLoginSuccess = () => {
    toast("loged in successfully");
    handleThemeChange("light");
    setactive("login");
  };

  const [formData, setFormData] = useState({
    Username: "",
    lastName: "",
    email: "",
    password: "",
    Country: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [PhoneinValid, setPhoneinValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    // Update the Country property of formData with the selected country
    setFormData((prevData) => ({
      ...prevData,
      Country: selectedCountry,
    }));
  };
  const handlePhoneChange = (Phone) => {
    // Update the Country property of formData with the selected country
    setFormData((prevData) => ({
      ...prevData,
      phone: Phone,
    }));
  };

  const validateStep1 = () => {
    // Check if formData.Username and formData.lastName exist and are not empty
    if (
      !formData.Username ||
      !formData.lastName ||
      !formData.lastName.trim() ||
      !formData.Username.trim()
    ) {
      setErrors(["All fields are mandatory"]);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    // Check if any of the required fields in step 2 don't exist or are empty
    if (
      !formData.email ||
      !formData.password ||
      !formData.Country.label ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.Country.label.trim() ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim()
    ) {
      setErrors(["All fields are mandatory"]);
      return false;
    } else if (PhoneinValid) {
      setErrors(["Phone length or code is invalid "]);
      return false;
    }
    setErrors([]);

    return true;
  };

  const handleSubmit = async () => {
    const data = {
      name: formData.Username.toLocaleLowerCase(),
      country: formData.Country,
      Email: formData.email.toLocaleLowerCase(),
      postalCode: formData.postalCode,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      password: formData.password.toLocaleLowerCase(),
    };

    const fieldsExist = Object.keys(data).every(
      (field) => data[field] !== undefined && data[field] !== ""
    );

    if (!fieldsExist) {
      setErrors(["All fields are mandatory"]);
    }

    try {
      setIsLoading(true);
      const response = await Signup(data).unwrap();
      handleLoginSuccess(response.token);
      setIsLoading(false);
    } catch (error) {
      if (error.data.data.error.code == "11000") {
        if (error.data.data.error.keyValue.Email) {
          setErrors(["Email already in the system ."]);
        } else if (error.data.data.error.keyValue.name) {
          setErrors(["Username already in the system ."]);
        } else if (error.data.data.error.keyValue.phone) {
          setErrors(["phone already in the system ."]);
        }
        // setErrors(["User already in the system ."]);
        setIsLoading(false);
      } else if (error.data && error.data.message) {
        setErrors([error.data.message]);
      } else if (error.data.data.error) {
        setIsLoading(false);
        setErrors([error.data.data.error.message]);
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      handleSubmit(); // Submit the form data
    }
  };

  return (
    <AuthLayout
      title={
        <>
          Welcome back to <br /> our community
        </>
      }
    >
      <h3 className="text-center text-xl font-semibold text-gray-700">
        Create your Faremit Account
      </h3>
      <p className="text-center text-sm mt-2 mb-5">
        please sign up with correct info{" "}
      </p>
      {errors.length > 0 && (
        <div className="text-red-500 w-full mb-2 bg-red-500">
          <div
            className="bg-red-100 w-full border border-red-400 text-red-700 px-4 py-2 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              {errors.map((error, index) => (
                <p key={index} className="text-red-300">
                  {error}
                </p>
              ))}
            </span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setErrors([])}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
      <form className="w-full" onSubmit={handleNext}>
        {currentStep === 1 && (
          <div className="space-y-5 w-full">
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                User name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="text"
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  placeholder="User Name"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Full name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Email <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  name="password"
                  type={show ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {show ? (
                  <HiEye
                    onClick={() => setShow(!show)}
                    className="cursor-pointer right-3 top-[0.7rem] text-gray-300 h-5 w-5 absolute"
                  />
                ) : (
                  <HiEyeSlash
                    onClick={() => setShow(!show)}
                    className="cursor-pointer right-3 top-[0.7rem] text-gray-300 h-5 w-5 absolute"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-5 w-full">
            <CountrySelect
              setSelectedCountry={handleCountryChange}
              SendingCountries={allowedCountries}
            />

            <div className="mt3 space-y-2 w-full">
              <PhoneNumberInput1
                phoneNumber={formData.phone}
                setValue={setPhoneinValid}
                selectedCountry={formData.Country}
                setPhoneNumber={handlePhoneChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                City <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Address "
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Address "
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                postalCode <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  className={`transition-all duration-300   py-2.5 px-4 w-full 
                                 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20
                             rounded-md text-sm placeholder-gray-400   focus:rin`}
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="postalCode "
                />
              </div>
            </div>
            <div className="flex items-start w-full justify-center p-0 m-0 text-xs">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className=" text-gray-600 font-normal space-x-1 ">
                  I agree the
                  <Link
                    className="font-medium ml-2 text-black hover:underline"
                    href="/privacy"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <span className="ml-1 text-primary-500 font-medium">
                      privacy
                    </span>
                  </Link>
                  ,
                  <Link
                    className="font-medium  text-gray-600 hover:underline "
                    href="/law"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <span className=" text-primary-500 font-medium">
                      {" "}
                      patriot act disclosure
                    </span>
                  </Link>
                  <Link
                    className="font-medium  text-black hover:underline "
                    href="/Consent"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <span className="text-gray-800">and</span>
                    <span className=" text-primary-500 font-medium">
                      {" "}
                      ACH payment authorization
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="mt-5 sm:mt-6 w-full">
          <div className="flex justify-between space-x-5">
            <button
              onClick={() => {
                currentStep === 2
                  ? setCurrentStep((prevStep) => prevStep - 1) // Update the onClick handler to go back
                  : closeModal();
              }}
              type="button" // Change the type to "button"
              className="text-dark block w-1/2 rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              {currentStep === 2 ? "Go Back" : "Cancel"}
            </button>
            <button
              type="submit"
              className="w-full   items-center justify-center space-x-3 transform-gpu hover:bg-white rounded-lg text-white bg-gradient-to-r bg-[#554AE4] hover:from-[#554AE4] hover:to-[#554AE4] block text-center duration-300 active:scale-100  hover:scale-95 scale-100 active:outline-none px-3 lg:px-4 xl:px-8 font-medium lg:text-lg py-3   focus:outline-none focus:ring focus:border-indigo-500 focus:ring-indigo-500/50"
            >
              {isLoading && currentStep === 2 ? (
                <AnimatedSVG className="w-full h-8" />
              ) : (
                <span className="w-24 truncate md:-w-max">
                  {currentStep === 1 ? "Next" : "Sign up"}
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegistrationForm;
