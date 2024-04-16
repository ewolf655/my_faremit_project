import React, { useState } from "react";
import Flag from "react-world-flags";

function SupportedCountries() {
    const [selectedContinent, setSelectedContinent] = useState("Africa");

    // Sample data for continents and their countries
    const continentData = {
        Africa: {
            countries: [
                { name: "Algeria", code: "DZA" },
                { name: "Angola", code: "AGO" },
                { name: "Benin", code: "BEN" },
                { name: "Botswana", code: "BWA" },
                { name: "Burkina Faso", code: "BFA" },
                { name: "Burundi", code: "BDI" },
                { name: "Cabo Verde", code: "CPV" },
                { name: "Cameroon", code: "CMR" },
                { name: "Central African Republic", code: "CAF" },
                { name: "Chad", code: "TCD" },
                { name: "Comoros", code: "COM" },
                { name: "Congo", code: "COG" },
                { name: "Democratic Republic of the Congo", code: "COD" },
                { name: "Djibouti", code: "DJI" },
                { name: "Egypt", code: "EGY" },
                { name: "Equatorial Guinea", code: "GNQ" },
                { name: "Eritrea", code: "ERI" },
                { name: "Eswatini", code: "SWZ" },
                { name: "Ethiopia", code: "ETH" },
                { name: "Gabon", code: "GAB" },
                { name: "Gambia", code: "GMB" },
                { name: "Ghana", code: "GHA" },
                { name: "Guinea", code: "GIN" },
                { name: "Guinea-Bissau", code: "GNB" },
                { name: "Ivory Coast", code: "CIV" },
                { name: "Kenya", code: "KEN" },
                { name: "Lesotho", code: "LSO" },
                { name: "Liberia", code: "LBR" },
                { name: "Libya", code: "LBY" },
                { name: "Madagascar", code: "MDG" },
                { name: "Malawi", code: "MWI" },
                { name: "Mali", code: "MLI" },
                { name: "Mauritania", code: "MRT" },
                { name: "Mauritius", code: "MUS" },
                { name: "Morocco", code: "MAR" },
                { name: "Mozambique", code: "MOZ" },
                { name: "Namibia", code: "NAM" },
                { name: "Niger", code: "NER" },
                { name: "Nigeria", code: "NGA" },
                { name: "Rwanda", code: "RWA" },
                { name: "Sao Tome and Principe", code: "STP" },
                { name: "Senegal", code: "SEN" },
                { name: "Seychelles", code: "SYC" },
                { name: "Sierra Leone", code: "SLE" },
                { name: "Somalia", code: "SOM" },
                { name: "South Africa", code: "ZAF" },
                { name: "South Sudan", code: "SSD" },
                { name: "Sudan", code: "SDN" },
                { name: "Tanzania", code: "TZA" },
                { name: "Togo", code: "TGO" },
                { name: "Tunisia", code: "TUN" },
                { name: "Uganda", code: "UGA" },
                { name: "Zambia", code: "ZMB" },
                { name: "Zimbabwe", code: "ZWE" }
            ],
            // Assuming you have continent images stored locally or hosted
            image: "/images/flags/afruca.png"
        },
        Europe: {
            countries: [
                { name: "Albania", code: "ALB" },
                { name: "Armenia", code: "ARM" },
                { name: "Austria", code: "AUT" },
                { name: "Belarus", code: "BLR" },
                { name: "Belgium", code: "BEL" },
                { name: "Bosnia & Herzegovina", code: "BIH" },
                { name: "Bulgaria", code: "BGR" },
                { name: "Croatia", code: "HRV" },
                { name: "Cyprus", code: "CYP" },
                { name: "Czech Republic", code: "CZE" },
                { name: "Denmark", code: "DNK" },
                { name: "Estonia", code: "EST" },
                { name: "Finland", code: "FIN" },
                { name: "France", code: "FRA" },
                { name: "Georgia", code: "GEO" },
                { name: "Germany", code: "DEU" },
                { name: "Gibraltar", code: "GIB" },
                { name: "Greece", code: "GRC" },
                { name: "Hungary", code: "HUN" },
                { name: "Iceland", code: "ISL" },
                { name: "Ireland", code: "IRL" },
                { name: "Italy", code: "ITA" },
                { name: "Kosovo", code: "XKX" },
                { name: "Latvia", code: "LVA" },
                { name: "Liechtenstein", code: "LIE" },
                { name: "Lithuania", code: "LTU" },
                { name: "Luxembourg", code: "LUX" },
                { name: "Malta", code: "MLT" },
                { name: "Moldova", code: "MDA" },
                { name: "Monaco", code: "MCO" },
                { name: "Montenegro", code: "MNE" },
                { name: "Netherlands", code: "NLD" },
                { name: "North Macedonia", code: "MKD" },
                { name: "Norway", code: "NOR" },
                { name: "Poland", code: "POL" },
                { name: "Portugal", code: "PRT" },
                { name: "Romania", code: "ROU" },
                { name: "Russia", code: "RUS" },
                { name: "San Marino", code: "SMR" },
                { name: "Serbia", code: "SRB" },
                { name: "Slovakia", code: "SVK" },
                { name: "Slovenia", code: "SVN" },
                { name: "Spain", code: "ESP" },
                { name: "Sweden", code: "SWE" },
                { name: "Switzerland", code: "CHE" },
                { name: "Turkey", code: "TUR" },
                { name: "Ukraine", code: "UKR" },
                { name: "United Kingdom", code: "GBR" }
                // Note: England is part of the United Kingdom and does not have a separate ISO code.
            ],
            image: "/images/flags/australia.png"
        },
        NorthAmerica: {
            countries: [
                { name: "USA", code: "USA" },
                { name: "Canada", code: "CAN" },
                { name: "Mexico", code: "MEX" }
            ],
            image: "/images/continents/northamerica.png"
        }
    };

    const handleContinentClick = continent => {
        setSelectedContinent(continent);
    };

    return (
        <div className="flex relative flex-col bg-[#F7F6FD] sm:mb-80 overflow-hidden lg:mb-24 w-full max-h-screen">
            {/* top */}
            <div className=" flex-col justify-center items-center text-center w-full">
                <h1>Beyond Borders, Beyond Limits</h1>
                <p>Transfers made easy to over 150 countries.</p>
            </div>
            {/* top center */}
            <div className="flex flex-wrap mt-10 md:justify-center items-center  space-x-2 w-full h-full">
                {Object.keys(continentData).map(continent => (
                    <>
                        {" "}
                        <div
                            className="flex items-center cursor-pointer space-x-2  justify-center  h-10 px-5 py-5 rounded-xl border border-Grey-500"
                            onClick={() => handleContinentClick(continent)}
                        >
                            <img
                                src={continentData[continent].image}
                                alt={continent}
                                className="w-4 h-4"
                            />
                            <h4>{continent}</h4>
                        </div>
                    </>
                ))}
            </div>

            {/* bottom */}
            <div className="flex   flex-wrap md:justify-center max-w-7xl mx-auto space-y-5  items-center   space-x-2 ">
                {continentData[selectedContinent].countries.map(({ name, code }) => (
                    <>
                        <div className="flex items-center space-x-2  justify-center mt-5  h-10 px-5 py-5 rounded-xl border border-Grey-500">
                            <div className="rounded-full mt-1.5 w-6 h-6">
                                <Flag code={code} height="16" />
                            </div>

                            <span>{name}</span>
                        </div>
                    </>
                ))}
            </div>
            <img
                src="/images/ellipse.png"
                alt=""
                className="absolute bottom-0 sm:hidden md:flex top-72 h-96 w-96 left-[484px] mb-96  "
            />
        </div>
    );
}

export default SupportedCountries;
