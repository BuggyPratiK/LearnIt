import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Appbar from './components/Appbar';
import Landing from './pages/Landing';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import PurchasedCourses from './pages/PurchasedCourses';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import AdminSignin from './pages/AdminSignin';
import AdminDashboard from './pages/AdminDashboard';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';

function App() {
  return (
      <div className="min-h-screen bg-background text-foreground">
      <Appbar />
      <main>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/purchased" element={<PurchasedCourses />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route path="/admin/edit-course/:courseId" element={<EditCourse />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;