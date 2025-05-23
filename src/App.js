import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import component
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import About from './About/About.js';
import AllDoctors from './AllDoctors/AllDoctors.js';
import Contact from './Contact/Contact.js';
import DoctorProfile from './AllDoctors/DoctorProfile';
import Blog from './Blog/Blog.js'
import BlogPost from './Blog/BlogPost.js';
import Appointment from './Appointment/Appointment';
import ChatWidget from './Home/ChatWidget';

// Admin components
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';

// import AppContext
import AppContextProvider from './Context/AppContext.js';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/AllDoctors' element={<AllDoctors />} />
            <Route path='/doctors' element={<AllDoctors />} />
            <Route path='/doctors/:speciality' element={<AllDoctors />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/blog/' element={<Blog />} />
            <Route path="/Blog/:id" element={<BlogPost />} />
            <Route path="/Appointment" element={<Appointment />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/doctors" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <ChatWidget /> {/* Add ChatWidget here - it will appear on all pages */}
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;