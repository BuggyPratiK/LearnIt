const FormCard = ({ title, children, buttonText, onSubmit, message }) => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{title}</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}
            <div className="space-y-4">
                {children}
            </div>
            <button
                onClick={onSubmit}
                className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
            >
                {buttonText}
            </button>
        </div>
    </div>
);

export default FormCard;

