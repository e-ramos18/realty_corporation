import React from "react";
import Image from "next/image";
import "@/styles/globals.css";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { destroyCookie, parseCookies } from "nookies";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNav = (props) => {
  const [currentPage, setCurrentPage] = React.useState("Dashboard");
  const navigation = [
    {
      name: "Dashboard",
      href: "#",
      page: "Dashboard",
    },
    {
      name: "Condominiums",
      href: "#",
      page: "Condominiums",
    },
    { name: "Air Bnb", href: "#", page: "Air Bnb" },
    { name: "House", href: "#", page: "House" },
    { name: "Land", href: "#", page: "Land" },
  ];

  const onClickHandlerMenu = (event) => {
    const { name } = event.target;
    setCurrentPage(name);
    props.onClickHandlerMenuItem(name);
  };

  const onClickHandlerLogout = () => {
    destroyCookie(null, "GRCT");
    window.location.assign("/login");
  };

  React.useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.GRCT) window.location.assign("/login");
  });

  return (
    <Disclosure as="nav" className="bg-primary-gold shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6">
            <div className="relative flex h-14 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    src={"/logo/logo.jpg"}
                    alt={"Golden Realty Corporation"}
                    className="mx-auto h-10 w-auto rounded-full"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        name={item.name}
                        href={item.href}
                        className={classNames(
                          item.page === currentPage
                            ? "bg-lighter-gold shadow-md"
                            : " hover:bg-lighter-gold",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.page === currentPage ? "page" : undefined
                        }
                        onClick={onClickHandlerMenu}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className=" flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden sm:ml-6 sm:block">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={onClickHandlerLogout}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ArrowRightOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-200" : "hover:bg-gray-300",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.page === currentPage ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                key={"logout"}
                as="a"
                href={"#"}
                className={classNames(
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                onClick={onClickHandlerLogout}
              >
                {"Logout"}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AdminNav;
