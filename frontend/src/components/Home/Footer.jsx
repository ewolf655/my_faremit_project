import { FacebookIcon, Instagram, LinkedinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const history = useRouter();

  const handleLinkClick = (to) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Navigate to the specified route
    history(to);
  };
  return (
    <>
      <div className="bg-[#FE5719] mt-10 max-w-7xl px-2 mx-auto h-64 rounded-md flex justify-center items-center text-center text-gray-100 flex-col">
        <h1 className="text2xl">
          Experience swift, secure, and cost-effective international
          transactions.{" "}
        </h1>
        <button className="bg-white text-gray-600 rounded-sm p-2.5   w-32 flex items-center justify-center ">
          {" "}
          Sign up now
        </button>
      </div>

      <footer className="bg-[#FBFBFF] py-1 mt-10 border-t border-indigo-100">
        <div className=" bg-gray-900">
          <div className="max-w-2xl mx-auto text-white py-10">
            <div className="text-center">
              <h3 className="text-3xl mb-3"> Download our app </h3>
              <p> send money. any time, less Fee. </p>
              <div className="flex justify-center my-10">
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3 cursor-pointer">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Google Play Store </p>
                  </div>
                </div>
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3 cursor-pointer">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Apple Store </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-28 grid grid-cols-2 md:grid-cols-3 gap-10 p-5 items-center text-sm text-gray-400">
              <div className="order-1 md:order-2 flex flex-col space-y-4">
                <h1>Information</h1>

                <span
                  className="px-2 cursor-pointer"
                  onClick={() => handleLinkClick("/contact")}
                >
                  Help & Contact us
                </span>
                <p className="order-2 md:order-1 mt-8 md:mt-0">
                  {" "}
                  &copy; Faremit, 2022.{" "}
                </p>
              </div>
              <div className="order-1 md:order-2 flex flex-col space-y-4">
                <h1>Legal</h1>
                <span
                  className="px-2 cursor-pointer"
                  onClick={() => handleLinkClick("/privacy")}
                >
                  Terms & privacy
                </span>
                <span
                  className="px-2 cursor-pointer"
                  onClick={() => handleLinkClick("/law")}
                >
                  Patriot Act
                </span>
                <span
                  className="px-2 cursor-pointer"
                  onClick={() => handleLinkClick("/Consent")}
                >
                  Consent{" "}
                </span>
              </div>
              <div className="order-1 md:order-2 flex flex-col space-y-4">
                <h1>Follow Us</h1>
                <a
                  className="px-2 flex items-center cursor-pointer"
                  href="https://www.linkedin.com/company/faremit/"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span>Linked In</span>
                </a>
                <a className="px-2 flex  items-center cursor-pointer" href="">
                  <FacebookIcon className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                  className="px-2 flex space-x-2 items-center cursor-pointer"
                  href=""
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
