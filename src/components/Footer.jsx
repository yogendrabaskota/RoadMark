import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Pothole Reporter</h3>
            <p className="text-blue-200 max-w-md">
              Helping communities maintain safer roads through citizen
              reporting.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    How to Report
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Status Check
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">
                About
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Our Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Team
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Pothole Reporter. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-blue-300 hover:text-amber-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-amber-400 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
