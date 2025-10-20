const CourseCard = ({ course, onClick }) => (
    <div 
    className="bg-card text-card-foreground dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-border cursor-pointer" onClick={onClick}>
        <img className="h-56 w-full object-cover" src={course.imageUrl} alt={course.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/e2e8f0/e2e8f0?text=." }} />
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-sm mb-4 text-muted-foreground line-clamp-2">{course.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">${course.price}</p>
                <div className="font-semibold text-blue-500 dark:text-blue-400 hover:underline ">View Details</div>
            </div>
        </div>
    </div>
);

export default CourseCard;

