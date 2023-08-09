import { SiFacebook, SiInstagram } from "react-icons/si";
import Link from "next/link";

const Nav = () => {
  return (
    <header className="w-full absolute z-10 bg-white">
      <nav className="max-width flex-between padding-x padding-y bg-transparent">
        {/* Logo */}
        <div className="flex-center text-yellow-400">
          <Link href="/" className="text-lg font-bold uppercase">
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
    </header>
  );
};

const CategoryItem = ({ title }) => {
  return (
    <div className="relative group">
      <button className="border-b-2 border-transparent hover:border-yellow-500 hover:text-yellow-500 cursor-pointer py-3 px-10 uppercase font-semibold text-sm">
        {title}
      </button>
      <div className="absolute hidden group-hover:block bg-white p-2 mt-1 w-full">
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
