"use client"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-20 md:bg-transparent md:backdrop-blur-none md:border-b-0 bg-white/70 backdrop-blur-md border-b border-white/20">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 md:py-4 text-sm text-black">
        {/* Left - Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Forge Logo" 
            className="h-4 w-4" 
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative">
            <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
            }`}></span>
            <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out translate-y-2.5 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
            }`}></span>
          </div>
        </button>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-10">
          {/* Location */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/18855/18855353.png" 
              alt="Location" 
              className="w-4 h-4" 
            />
            <span className="text-gray-600 text-xs">Canada, Montreal</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {["Manufacture", "Tool library", "Get in touch"].map((link) => (
              <a 
                key={link} 
                href={link === "Manufacture" ? "#manufacture" : link === "Get in touch" ? "#contact" : "#"} 
                className="relative group transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (link === "Manufacture") {
                    const element = document.getElementById('manufacture');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  } else if (link === "Get in touch") {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative">
                  {link}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Desktop - Right Language */}
        <div className="hidden md:block space-x-2">
          <a href="#" className="relative group transition-colors">
            <span className="relative">
              Eng
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>{" "}
          /{" "}
          <a href="#" className="relative group transition-colors">
            <span className="relative">
              Fra
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/18855/18855353.png" 
              alt="Location" 
              className="w-4 h-4" 
            />
            <span>Canada, Montreal</span>
          </div>
          {["Manufacture", "Tool library", "Get in touch"].map((link) => (
            <a 
              key={link} 
              href={link === "Manufacture" ? "#manufacture" : link === "Get in touch" ? "#contact" : "#"}
              className="block py-2 group w-fit"
              onClick={(e) => {
                e.preventDefault();
                if (link === "Manufacture") {
                  const element = document.getElementById('manufacture');
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else if (link === "Get in touch") {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false); // Close mobile menu after clicking
              }}
            >
              <span className="relative">
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100 space-x-2">
            <a href="#" className="group inline-block">
              <span className="relative">
                Eng
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>{" "}
            /{" "}
            <a href="#" className="group inline-block">
              <span className="relative">
                Fra
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
