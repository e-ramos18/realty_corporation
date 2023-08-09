"use client";
import { SiFacebook, SiInstagram } from "react-icons/si";
import Link from "next/link";

import { footerLinks } from "@constants";

const Footer = () => (
  <div className="w-full absolute z-10 bg-white mt-10">
    <footer className="footer">
      <div className="footer__links-container">
        <div className="footer__rights">
          <div className="flex-center text-yellow-400">
            <Link href="/" className="text-lg font-bold uppercase">
              Golden Liberty
            </Link>
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-center mt-4 space-x-4">
            <SiFacebook size="20px" />
            <SiInstagram size="20px" />
            {/* Add more social media icons here */}
          </div>
        </div>

        <div className="footer__links">
          {footerLinks.map((item) => (
            <div key={item.title} className="footer__link">
              <h3 className="font-bold">{item.title}</h3>
              <div className="flex flex-col gap-5">
                {item.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className="text-gray-500"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__copyrights">
        <p>@{new Date().getFullYear()} Golden Liberty. All rights reserved</p>

        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy & Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
