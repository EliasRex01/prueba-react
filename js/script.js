const { useState } = React;
const { motion } = window["framer-motion"];

function App() {
    const [showChatbot, setShowChatbot] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Hola, soy Tu Nombre</h1>
            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
            >
                Chatbot
            </button>
            {showChatbot && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-gray-700 rounded"
                >
                    Chatbot activado.
                </motion.div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
