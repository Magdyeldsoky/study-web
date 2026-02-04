import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../logo";
import ThemeToggle from "./ThemTuggle";

const Nav = () => {
  const navItems = [{ name: "Download App", href: "#hero" }];

  const [isscrold, setIsscrold] = useState(false);
  const [isopen, setIsopen] = useState(false);

  useEffect(() => {
    const HandelScroll = () => {
      setIsscrold(window.scrollY > 10);
    };
    window.addEventListener("scroll", HandelScroll);
    return () => {
      window.removeEventListener("scroll", HandelScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isscrold ? "py-3 bg-bg/80 backdrop-blur-md shadow-xs" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between relative">
        <div className="relative left-3">
          <Logo />
        </div>

        <div className="desk hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          className="z-50 md:hidden text-foreground"
          onClick={() => setIsopen(!isopen)}
        >
          {isopen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="sm:hidden absolute top-3 left-3 z-50">
          <ThemeToggle />
        </div>

        <div
          className={`fixed inset-0 bg-bg/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition duration-300 md:hidden ${
            isopen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="mobil flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsopen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
