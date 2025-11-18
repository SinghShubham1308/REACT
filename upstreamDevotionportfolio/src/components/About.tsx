import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Code, Database, Server, Zap } from "lucide-react";

const iconMap: { [key: string]: any } = {
  "Clean Code": Code,
  "Microservices": Server,
  "Database Design": Database,
  "Performance": Zap,
};

interface AboutProps {
  data: any;
}

export function About({ data }: AboutProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 px-4 bg-accent/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">About Me</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features.map((feature: any, index: number) => {
            const Icon = iconMap[feature.title] || Code;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-background rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}