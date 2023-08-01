import { SiFacebook, SiInstagram } from "react-icons/si";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="pb-2 w-full flex justify-between items-center max-w-6xl z-20">
      {/* Logo */}
      <div className="flex items-center justify-between text-yellow-500">
        <Link href="/" className=" text-2xl font-bold">
          Golden Liberty
        </Link>
      </div>

      {/* Categories */}
      <div className="flex justify-center mt-4 space-x-1">
        <CategoryItem title="House" />
        <CategoryItem title="Condo" />
        <CategoryItem title="AirBnb" />
        <CategoryItem title="Realty" />
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center mt-4 space-x-4">
        <SiFacebook size="20px" />
        <SiInstagram size="20px" />
        {/* Add more social media icons here */}
      </div>
    </nav>
  );
};

const CategoryItem = ({ title }) => {
  return (
    <div className="relative group">
      <button className="border-b-2 border-transparent hover:border-yellow-500 hover:text-yellow-500 cursor-pointer py-3 px-10 uppercase">
        {title}
      </button>
      <div className="absolute hidden group-hover:block bg-white p-2 rounded mt-1">
        {/* Dropdown items */}
        <Link href="#" className="block p-2 hover:text-yellow-500">
          Item 1
        </Link>
        <Link className="block hover:text-yellow-500 p-2" href="#">
          Item 2
        </Link>
        {/* Add more dropdown items here */}
      </div>
    </div>
  );
};

const SocialIcon = ({ icon, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <icon />
      {/* <img
        src={`/icons/${icon}.svg`}
        alt={`${icon} icon`}
        className="w-6 h-6 hover:text-gray-300"
      /> */}
    </a>
  );
};

export default Nav;
