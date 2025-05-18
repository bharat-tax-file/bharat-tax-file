import Link from "next/link";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavProfileLinks from "./NavProfileLinks";

function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Function to close sidebar when clicking a link
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="w-full flex justify-center shadow-lg">
      <div className="navbar py-2 bg-base-100 max-w-6xl w-full px-4">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Hamburger Menu Button (Visible on Mobile) */}
          <div className="flex lg:hidden">
            <button onClick={toggleDrawer} className="btn btn-square btn-ghost">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Logo and ICO Icon */}
          <div className="md:flex-1 flex-none px-2 mx-2 flex items-center">
          
         <span className="font-bold text-xl">Bharat Tax File</span>
        

          </div>
        </div>

        {/* Navbar Center (Visible on Large Screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal custom-menu">
            <li>
              <Link href="/" onClick={closeDrawer}>Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={closeDrawer}>About Us</Link>
            </li>
            <li>
              <Link href="/services" onClick={closeDrawer}>Services</Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeDrawer}>Contact Us</Link>
            </li>
             <li>
            <Link href="/Tools" onClick={closeDrawer}>Tools</Link>
          </li>
            
          </ul>
        </div>

        {/* Navbar End (Visible on Large Screens) */}
        <div className="navbar-end hidden lg:flex">
          <NavProfileLinks />
        </div>
      </div>

      {/* Sidebar (Drawer) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeDrawer}></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button className="absolute top-4 right-4" onClick={closeDrawer}>
          ✕
        </button>
        <ul className="menu p-4">
          <li>
            <Link href="/" onClick={closeDrawer}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={closeDrawer}>About Us</Link>
          </li>
          <li>
            <Link href="/services" onClick={closeDrawer}>Services</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeDrawer}>Contact Us</Link>
          </li>
          <li>
            <Link href="/Tools" onClick={closeDrawer}>Tools</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
