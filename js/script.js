const { useState } = React;
const { motion } = window["framer-motion"];

function App() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const aboutMeData = {
        name: "Tu Nombre",
        role: "Desarrollador Web Full Stack",
        skills: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"],
        hobbies: "Me gusta programar, leer libros de tecnología y jugar videojuegos.",
        contact: "Puedes contactarme en mi correo: tuemail@example.com",
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        setChatMessages((prev) => [...prev, { sender: "user", text: userInput }]);

        let botResponse = "Lo siento, no entiendo esa pregunta.";
        if (userInput.toLowerCase().includes("nombre")) {
            botResponse = `Mi nombre es ${aboutMeData.name}.`;
        } else if (userInput.toLowerCase().includes("habilidades")) {
            botResponse = `Mis habilidades incluyen: ${aboutMeData.skills.join(", ")}.`;
        } else if (userInput.toLowerCase().includes("hobbies")) {
            botResponse = aboutMeData.hobbies;
        } else if (userInput.toLowerCase().includes("contacto")) {
            botResponse = aboutMeData.contact;
        }

        setTimeout(() => {
            setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        }, 500);

        setUserInput("");
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans relative">
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-8 md:px-16 lg:px-32">
                <img
                    src="img/profile.jpg" 
                    alt="Foto de perfil"
                    className="rounded-full w-48 h-48 border-4 border-blue-500 mb-6"
                />
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hola, soy {aboutMeData.name}</h1>
                <p className="text-lg sm:text-xl text-gray-400 mb-8">
                    {aboutMeData.role} | Especializado en React, Tailwind CSS y Animaciones
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform duration-300"
                        >
                            <h2 className="text-xl font-semibold mb-2">Proyecto {index + 1}</h2>
                            <p className="text-gray-400">
                                Descripción breve del proyecto {index + 1}.
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="flex justify-center py-8 bg-gray-800">
                <a href="https://github.com/tuusuario" target="_blank" className="mx-4 text-gray-400 hover:text-white">
                    <i className="fab fa-github text-2xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/tuusuario" target="_blank" className="mx-4 text-gray-400 hover:text-white">
                    <i className="fab fa-linkedin text-2xl"></i>
                </a>
                <a href="https://twitter.com/tuusuario" target="_blank" className="mx-4 text-gray-400 hover:text-white">
                    <i className="fab fa-twitter text-2xl"></i>
                </a>
            </div>

            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
            >
                <i className="fas fa-rocket text-xl"></i>
            </button>

            <div className="fixed bottom-4 right-4">
                <button
                    onClick={() => setShowChatbot(!showChatbot)}
                    className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                >
                    IA
                </button>

                {showChatbot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-4 w-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="p-4 h-64 overflow-y-auto">
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                                    <span className={`inline-block px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                                        {message.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 p-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Escribe una pregunta..."
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
