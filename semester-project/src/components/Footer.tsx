import Logo from "@/components/Logo";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-brand-blue-300 flex justify-between items-center p-8">
      {/* Left: Social icons */}
      <div className="flex items-center gap-4">
        <span className="font-urbanist text-brand-orange-75 text-xl">
          Find us on:
        </span>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-brand-orange-75 hover:text-brand-blue-500 transition-colors duration-200"
          >
            <FaFacebook size={40} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-brand-orange-75 hover:text-brand-blue-500 transition-colors duration-200"
          >
            <FaInstagram size={40} />
          </a>
        </div>
      </div>

      {/* Right: Logo */}
      <div>
        <Logo />
      </div>
    </div>
  );
};

export default Footer;
