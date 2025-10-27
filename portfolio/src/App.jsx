import { useState } from "react";
import "./App.css";
import { ProjectList } from "./components/ProjectList";
import { Header } from "./components/Header";
import { ContactForm } from "./components/ContactForm";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContactForm = () => setIsContactOpen(true);
  const closeContactForm = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onContactClick={openContactForm} />
      <main>
        <ProjectList />
      </main>
      {isContactOpen && <ContactForm onClose={closeContactForm} />}
    </div>
  );
}

export default App;
