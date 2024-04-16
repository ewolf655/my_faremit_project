"use client";
import AboutUs from "@/components/Home/AboutUs";
import FAQ from "@/components/Home/Faq";
import Footer from "@/components/Home/Footer";
import PaymentMethods from "@/components/Home/PaymentMethods";
import SupportedCountries from "@/components/Home/SupportedCountries";
import StepsComponent from "@/components/Home/stepsComponent";
import Banner from "@/components/layouts/Banner";
import Nav from "@/components/layouts/Nav";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <Nav />
      <div>
        <Banner />
        <div className="-mt-52 md:mt-10 ">
          <>
            <AboutUs />
            <StepsComponent />
            <PaymentMethods />
            <SupportedCountries />
            <FAQ />
            <Footer />
          </>
        </div>
      </div>
    </Provider>
  );
}
