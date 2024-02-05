import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const footerDiv = twMerge(classNames("text-white font-small"));
const footerHead = twMerge(classNames("font-medium text-2xl"));

const Footer = () => {
  return (
    <div className="bg-gray-900 grid grid-cols-3 text-center p-12">
      <div className={footerDiv}>
        <p className={footerHead}>Tools</p>
        <ul>
          <li>Character Builder</li>
          <li>Compendium</li>
          <li>Rules</li>
          <li>Store</li>
        </ul>
      </div>
      <div className={footerDiv}>
        <p className={footerHead}>Company</p>
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Extra</li>
        </ul>
      </div>
      <div className={footerDiv}>
        <p className={footerHead}>Follow Us</p>
        <ul>
          <li>Twitter</li>
          <li>Youtube</li>
          <li>Facebook</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
