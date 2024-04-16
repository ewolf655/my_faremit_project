"use client";
import { useState } from "react";
import Image from "next/image"; // Import Image component from Next.js
import TransferForm from "../controllers/TransferForm";
import ModalContainer from "../modal/ModalContainer";
import { Container } from "../Utils/utils";

const Banner = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLoginSuccess = () => {
    closeModal(); // Close the modal after successful login
  };

  return (
    <section className="w-full max-w-full overflow-hidden bg-white bg-opacity-25 backdrop-blur">
      <div className="relative bg-auto bg-no-repeat bg-[top_120px_right] md:bg-[top_70px_right] lg:bg-[top_100px_right]">
        <div className="pt-[150px] pb-[250px] xl:pb-[200px]">
          <Container className="mdpt-5 flex flex-col lg:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-4 lg:space-x-0 lg:justify-between relative z-10">
            {/* left bar */}
            <div>
              <h1 className="font-neue-haas-grotesk-display-pro md:text-7xl w-max text-slate-900 text-opacity-100 leading-none font-medium">
                Low fees and the <br />
                Best Rates For You
              </h1>
              <div className="mt-4 ml-0.5 font-neue-haas-grotesk-display-pro text-xl md:w-[633px] text-stone-500 text-opacity-100 leading-9 tracking-wider font-normal">
                Send money with ease across the world with our fast and secure
                platform.
              </div>
              <div className="flex items-center space-x-1.5">
                <button className="mt-8  sm:flex flex justify-center border  items-center rounded-md w-36 h-12 shadow-sm bg-white border-black">
                  <div className="flex space-x-3  justify-center items-center w-24 h-4">
                    <Image
                      src="/images/apple.png"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <div className="font-inter text-base whitespace-nowrap text-gray-800  text-opacity-100 leading-7 font-bold">
                      App store
                    </div>
                  </div>
                </button>
                <button className="mt-8  sm:flex flex justify-center border  items-center rounded-md w-36 h-12 shadow-sm bg-black text-white border-black">
                  <div className="flex space-x-3  justify-center items-center w-24 h-4">
                    <Image
                      src="/images/playstore.png"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <div className="font-inter text-base whitespace-nowrap   text-opacity-100 leading-7 font-bold">
                      App store
                    </div>
                  </div>
                </button>
              </div>
            </div>
            {/* right bar */}

            <TransferForm />
            <div className="absolute bottom-10 w-full h-full -top-44 left-[300px] -right-4   z-10">
              <Image
                src="/images/world.png"
                alt="Svg Asset 12"
                width={1000}
                height={1000}
              />
            </div>
          </Container>
        </div>
      </div>{" "}
      <div className="bg-white -mt-44 py-8">
        <div className="container flex justify-between flex-wrap items-center mx-auto px-6">
          <h2 className="text-3xl text-center text-gray-800 font-semibold mb-6">
            Our <br />
            Partners
          </h2>

          <div className="flex justify-center items-center space-x-5 md:space-x-14">
            <Image
              src="/images/partners/premiere.png"
              alt="Premier Bank"
              width={120}
              height={48}
            />
            <Image
              src="/images/partners/mtn.png"
              alt="MTN"
              width={120}
              height={48}
            />
            <Image
              src="/images/partners/mpessa.png"
              alt="M-PESA"
              width={120}
              height={48}
            />
            <Image
              src="/images/partners/evc.png"
              alt="EVC Plus"
              width={120}
              height={48}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        isOpen={modalOpen}
        closeModal={closeModal}
        handleLoginSuccess={handleLoginSuccess} // Pass the callback function
        setIsOpen={setModalOpen}
      />
    </section>
  );
};

export default Banner;
