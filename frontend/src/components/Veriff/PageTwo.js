/* eslint-disable no-unused-vars */
import { useState } from "react";

import VeriffKyc from "../../pages/VeriffKyc";
import "./PageTwo.css";

const PageTwo = ({ onButtonClick }) => {
    const [name, setname] = useState("");
    const defaultMessage = {
        name: [],
        phone: [],
        password: []
    };
    // const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [selectedCountry, setSelectedCountry] = useState("hi");

    return (
        <main className="pt5 black-80 center">
            <form className="measure">
                <h2 className="text-xl">You information</h2>
                <p className="text-gray-300 mt-2">
                    You can always create another workspace later.lways create another workspace
                    later.
                </p>

                <div className="mt-14 flex items-center justify-center ">
                    <VeriffKyc
                        selectedCountry={selectedCountry}
                        name={name}
                        onButtonClick={onButtonClick}
                    />
                </div>
            </form>
        </main>
    );
};

export default PageTwo;
