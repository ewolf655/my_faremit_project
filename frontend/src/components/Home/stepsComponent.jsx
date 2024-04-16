import React from "react";

const steps = [
    {
        number: "01",
        text: "Create an account. It's quick and secure",
        bg: "text-gray-800 bg-[#FE956ECC] "
    },
    {
        number: "02",
        text: "Verify your details. Better security for everyone.",
        bg: "text-gray-800 bg-[#FFB79CCC]"
    },
    {
        number: "03",
        text: "Add a recipient and a payment method.",
        bg: "text-gray-800 bg-[#FFD7C8CC] "
    },
    { number: "04", text: "Send money across the world.", bg: "text-gray-800  bg-[#FFEEE8]" },
    { number: "05", text: "Keep track of your transfers.", bg: "text-gray-800 bg-[#FFF7F4] " }
];

const StepCard = ({ number, text, bg }) => {
    return (
        <div
            className={`flex-1 ${bg} p-5 rounded-lg   shadow-md m-2 h-96 flex sm:flex-row md:flex-col  md:space-y-24`}
        >
            <div className="text-xl font-bold">{number}</div>
            <p className="text-md mt-10 text-gray-600 ">{text}</p>
        </div>
    );
};

const StepsComponent = () => {
    return (
        <div className="py-10 px-5 md:px-24 bg-[#FFF7F4] my-10">
            <h1 className="text-4xl font-bold  mb-5 text-[#fe5719]">Fast, Secure and Reliable.</h1>
            <p className=" mb-10">
                Create an account in five easy steps via the web or mobile app.
            </p>
            <div className="flex flex-col md:flex-row md:flex-wrap   gap-4">
                {steps.map(step => (
                    <StepCard
                        key={step.number}
                        number={step.number}
                        text={step.text}
                        bg={step.bg}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepsComponent;
