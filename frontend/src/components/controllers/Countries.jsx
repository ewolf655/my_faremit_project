/* eslint-disable import/order */
import React, { useEffect, useState } from "react";
import PhoneInput1 from "react-phone-input-2";
import Select from "react-select";
import "react-phone-input-2/lib/style.css"; // Import isValidNumber and format from libphonenumber-js
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
export const CitySelect = ({ selectedCountry, selectedCity, setSelectedCity, error }) => {
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        let newCityOptions = [""];

        switch (selectedCountry.label) {
            case "🇰🇪 Kenya":
                newCityOptions = ["Nairobi", "Mombasa", "Kisumu"];
                break;
            case "🇬🇭 Ghana":
                newCityOptions = ["Accra", "Kumasi", "Tamale"];
                break;
            case "Uganda":
                newCityOptions = ["Kampala", "Entebbe", "Gulu"];
                break;
            case "🇪🇹 Ethiopia":
                newCityOptions = ["Addis Ababa", "Dire Dawa", "Mekelle"];
                break;
            case "🇺🇬 Uganda":
                newCityOptions = ["Kampala", "Nansana", "Kira"];
                break;
            case "🇸🇴 Somalia":
                newCityOptions = ["Mogadishu", "Hargeisa", "Kismayo"];
                break;
            default:
                break;
        }

        setCityOptions(newCityOptions);
        setSelectedCity(null); // Reset selected city when country changes
    }, [selectedCountry]);

    const handleCityChange = selectedOption => {
        setSelectedCity(selectedOption);
    };

    const selectClassName = error ? "border-red-300" : "border-gray-300";

    return (
        <Select
            options={cityOptions.map(city => ({ value: city, label: city }))}
            value={selectedCity}
            className={`${selectClassName} focus:border-indigo-500 focus:ring-indigo-500/20`}
            onChange={handleCityChange}
        />
    );
};
export const CountrySelect = ({ selectedCountry, setSelectedCountry, error, SendingCountries }) => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then(response => response.json())
            .then(data => {
                const allowedCountries = data.countries.filter(country => {
                    const countryName = country.value;
                    return SendingCountries.includes(countryName);
                });
                setCountries(allowedCountries);
                if (!selectedCountry && allowedCountries.length > 0) {
                    setSelectedCountry(allowedCountries[0]);
                }
            })
            .catch(error => {
                // Handle any errors if needed
                console.error("Error fetching countries:", error);
            })
            .finally(() => {
                // Set loading to false regardless of success or failure
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? ( // Display loading indicator
                <p>Loading...</p>
            ) : (
                <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={selectedOption => setSelectedCountry(selectedOption)}
                    className={`${
                        error ? "border-red-300" : "border-gray-300"
                    } focus:border-indigo-500 focus:ring-indigo-500/20`}
                />
            )}
        </div>
    );
};
export const PhoneNumberInput = ({ selectedCountry, phoneNumber, setPhoneNumber }) => {
    const con = selectedCountry ? selectedCountry.value.toLowerCase() : "";

    // Function to format the phone number with the country code
    const formatPhoneNumberWithCountryCode = (countryCode, number) => {
        if (!number) {
            return "";
        }
        // Add the '+' symbol and the country code to the phone number
        return `+${countryCode}${number}`;
    };

    const validatePhoneNumber = number => {
        // Replace this with your validation logic based on the selected country
        // You can use regular expressions or country-specific validation rules
        // For a basic example, you can check if the number is not empty
        return number.trim() !== "";
    };

    const handlePhoneNumberChange = value => {
        // Validate the phone number before updating the state
        if (validatePhoneNumber(value, con)) {
            setPhoneNumber(value);
        }
    };

    // Format the phone number with the country code for display
    const formattedPhoneNumber = formatPhoneNumberWithCountryCode(con, phoneNumber);

    return (
        <>
            <PhoneInput1
                country={con}
                value={formattedPhoneNumber} // Display the formatted number
                inputStyle={{ width: "100%" }}
                onChange={handlePhoneNumberChange}
                disableDropdown
            />
        </>
    );
};
export const PhoneNumberInput1 = ({ selectedCountry, setPhoneNumber, setValue }) => {
    const con = selectedCountry ? selectedCountry.value.toUpperCase() : "";

    const handlePhoneInputChange = newValue => {
        if (typeof newValue === "string") {
            if (isValidPhoneNumber(newValue)) {
                setValue(false);
                setPhoneNumber(newValue);
            } else {
                setValue(true);
            }
        } else {
            // Handle cases where newValue is not a string
            console.error("Input is not a string");
        }
    };
    return (
        <>
            <PhoneInput
                placeholder="Enter phone number"
                defaultCountry={con}
                withCountryCallingCode
                countryCallingCodeEditable
                onChange={handlePhoneInputChange}
            />
        </>
    );
};
