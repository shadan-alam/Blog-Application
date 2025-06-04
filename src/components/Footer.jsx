import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">Blog-O-Pedia</h2>
          <p className="text-sm mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <FaGithub />
          </a>
        </div>
        <div className="text-sm text-center md:text-right">
          <a href="/about" className="hover:text-white">
            About
          </a>{" "}
          ·
          <a href="/contact" className="ml-2 hover:text-white">
            Contact
          </a>{" "}
          ·
          <a href="/privacy" className="ml-2 hover:text-white">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
