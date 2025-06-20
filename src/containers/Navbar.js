// Import Link component from Next.js for client-side navigation
import Link from "next/link";

// Import useState hook from React to manage component state
import { useState } from "react";

// Import Hamburger icon from Heroicons
import { Bars3Icon } from "@heroicons/react/24/outline";

// Import custom navigation profile component
import NavProfileLinks from "./NavProfileLinks";

// Functional component for Navbar
function Navbar() {
  // State to track whether the drawer is open or closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle the drawer open/closed
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    // Outer wrapper to center navbar and add shadow, and make sticky
    <div className="w-full flex justify-center shadow-lg sticky top-0 z-50 bg-base-100">
      
      {/* Main navbar container with padding and max width */}
      <div className="navbar py-2 bg-base-100 max-w-6xl w-full px-4">
        
        {/* Left side of the navbar: Logo */}
        <div className="navbar-start">
          {/* Logo container */}
          <div className="md:flex-1 flex-none px-2 mx-2 flex items-center">
            {/* Logo text */}
            <span className="font-bold text-xl">Bharat Tax File</span>
          </div>
        </div>

        {/* Center part of the navbar: Navigation menu (only visible on large screens) */}
        <div className="navbar-center hidden lg:flex">
          {/* Horizontal menu list */}
          <ul className="menu menu-horizontal custom-menu">
            {/* Each menu item with link and closeDrawer on click */}
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

        {/* Right side of the navbar */}
        <div className="navbar-end flex items-center">
          
          {/* Hamburger menu button (only visible on small screens) */}
          <div className="lg:hidden">
            <button onClick={toggleDrawer} className="btn btn-square btn-ghost">
              {/* Icon for hamburger menu */}
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Profile links (only visible on large screens) */}
          <div className="hidden lg:flex">
            <NavProfileLinks />
          </div>
        </div>
      </div>

      {/* Overlay background when drawer is open */}
      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeDrawer}></div>
          {/* Prevent background scroll when sidebar is open */}
          <style>{`body { overflow: hidden !important; }`}</style>
        </>
      )}

      {/* Sidebar Drawer (slides in from the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close (X) button on top-right of drawer */}
        <button className="absolute top-4 right-7 text-2xl" onClick={closeDrawer}>
  ✕
</button>


        {/* Drawer menu list (same as top menu) */}
        <ul className="menu p-4 space-y-5">
          <li className="mt-6">
            <Link href="/" onClick={closeDrawer} className="text-xl font-semibold">Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={closeDrawer} className="text-xl font-semibold">About Us</Link>
          </li>
          <li>
            <Link href="/services" onClick={closeDrawer} className="text-xl font-semibold">Services</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeDrawer} className="text-xl font-semibold">Contact Us</Link>
          </li>
          <li>
            <Link href="/Tools" onClick={closeDrawer} className="text-xl font-semibold">Tools</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Exporting the Navbar component for use in other files
export default Navbar;
// This component defines a responsive navigation bar with a logo, menu items, and a profile section.
// It includes a hamburger menu for small screens and a sliding drawer for navigation.
// navbar is styled with Tailwind CSS classes for layout and responsiveness.
// The component uses React hooks to manage the open/close state of the drawer.
// The drawer contains the same menu items as the top navigation for consistency across screen sizes.
// The component also includes an overlay background when the drawer is open to enhance user experience.