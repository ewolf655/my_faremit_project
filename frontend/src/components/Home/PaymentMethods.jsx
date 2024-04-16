import React from "react";

const paymentMethods = [
    {
        title: "Debit Card",
        description:
            "Use your debit card to send money in a snap. It’s fast, secure, and straightforward.",
        bgColor: "bg-[#F5F4FD]",
        icon: "/images/debit-card.png", // replace with your actual icon path
        comingSoon: true
    },
    {
        title: "Bank Transfers",
        description:
            "Link your bank account and send money easily. It’s fast, secure, and straightforward",
        bgColor: "bg-[#D6D4F780]",
        icon: "/images/bank_transfer.png", // replace with your actual icon path
        comingSoon: false
    },
    {
        title: "Credit Card",
        description:
            "Use your credit card to send money in a snap. It’s fast, secure, and straightforward",
        bgColor: "bg-[#EEEDFC99]",
        icon: "/images/credit-card.png", // replace with your actual icon path
        comingSoon: true
    }
];

const PaymentMethodCard = ({ title, description, bgColor, icon, comingSoon }) => {
    return (
        <div
            className={`flex flex-col justify-between space-y-6 items-center p-6 rounded-lg shadow-lg m-2 ${bgColor} relative`}
        >
            {comingSoon && (
                <span className="absolute rotate-45 top-2 right-2 bg-purple-200 text-purple-800 py-1 px-2 rounded-full text-xs">
                    Coming soon
                </span>
            )}
            {/* Ensure you have these icons in your project */}
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-center text-gray-500">{description}</p>
            <img src={icon} alt={title} className=" w-32 h-32 object-fit" />
        </div>
    );
};

const PaymentMethods = () => {
    return (
        <div className="py-10 px-5 mb-10 md:px-10 bg-white">
            <h1 className="text-3xl font-bold text-center mb-5  ">
                <span className="bg-blue-100 p-3 rounded-md ">Our payment methods</span>
            </h1>
            <p className="text-center mb-10">
                We are constantly working to introduce a variety of payment methods that are
                perfectly suited to you, wherever you are, across the world.
            </p>
            <div className="grid  md:grid-cols-3 max-w-5xl mx-auto  md:flex-row md:flex-wrap md:justify-center gap-4">
                {paymentMethods.map((method, index) => (
                    <PaymentMethodCard key={index} {...method} />
                ))}
            </div>
        </div>
    );
};

export default PaymentMethods;
