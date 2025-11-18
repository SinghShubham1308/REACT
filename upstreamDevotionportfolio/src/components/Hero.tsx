import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  data: {
    name: string;
    title: string;
    bio: string;
    github: string;
    linkedin: string;
    profileImage: string;
    backgroundImage: string;
    email: string; 
  };
}

export function Hero({ data }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      {/* Background Banner */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden">
        {data.backgroundImage ? (
          <ImageWithFallback
            src={data.backgroundImage}
            alt="Background banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            {data.profileImage ? (
              <ImageWithFallback
                src={data.profileImage}
                alt={data.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-background shadow-xl flex items-center justify-center">
                <span className="text-4xl">{data.name.charAt(0)}</span>
              </div>
            )}
          </motion.div>

          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary">{data.title}</span>
          </div>
          
          <motion.h1
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm {data.name}
          </motion.h1>
          
          <motion.p
            className="max-w-2xl mx-auto mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {data.bio}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button size="lg" onClick={() => scrollToSection("contact")}>
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")}>
              View Projects
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${data.email}`}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce hover:text-primary transition-colors"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}