const FormCard = ({ title, children, buttonText, onSubmit, message }) => (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card bg-slate-300 dark:bg-gray-900  shadow-2xl shadow-indigo-500/80 dark:drop-shadow-xl dark:shadow-indigo-500/70 rounded-2xl p-8 md:p-12 w-full max-w-md border border-border transition-colors duration-300">
            <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
            {message && (<p className="text-center text-red-500 mb-4">{message}</p>)}
            <div className="space-y-4">
                {children}
            </div>
            <button
                onClick={onSubmit}
                className="w-full mt-6 text-lg hover:scale-105 bg-gradient-to-b from-sky-400 to-blue-600  text-white py-3 rounded-lg font-semibold hover:opacity-90 hover:from-sky-400 hover:to-blue-700  transition-all duration-300"
            >
                {buttonText}
            </button>
        </div>
    </div>
);

export default FormCard;

