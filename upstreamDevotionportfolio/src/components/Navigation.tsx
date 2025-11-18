import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy logic
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const getLinkClasses = (section: string) => {
    const baseClasses = "px-3 py-2 rounded-md transition-all";
    const activeClasses = "bg-primary text-primary-foreground";
    const inactiveClasses = "hover:text-primary hover:bg-accent/50";
    
    return `${baseClasses} ${activeSection === section ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="font-semibold">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("home")} className={getLinkClasses("home")}>
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className={getLinkClasses("about")}>
              About
            </button>
            <button onClick={() => scrollToSection("skills")} className={getLinkClasses("skills")}>
              Skills
            </button>
            <button onClick={() => scrollToSection("projects")} className={getLinkClasses("projects")}>
              Projects
            </button>
            <Button onClick={() => scrollToSection("contact")}>Contact</Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("home")} className={`text-left ${getLinkClasses("home")}`}>
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className={`text-left ${getLinkClasses("about")}`}>
              About
            </button>
            <button onClick={() => scrollToSection("skills")} className={`text-left ${getLinkClasses("skills")}`}>
              Skills
            </button>
            <button onClick={() => scrollToSection("projects")} className={`text-left ${getLinkClasses("projects")}`}>
              Projects
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full">
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}