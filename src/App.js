import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import component
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import About from './About/About.js';
import AllDoctors from './AllDoctors/AllDoctors.js';
import Contact from './Contact/Contact.js';

// import Blog components
import Blog from './Blog/Blog.js';

// import Admin components
import AdminLogin from './Admin/AdminLogin.js';
import AdminDashboard from './Admin/AdminDashboard.js';
import ProtectedRoute from './Blog/ProtectedRoute.js';

// import AppContext
import AppContextProvider from './Context/AppContext.js';

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
            <Route path='/Contact' element={<Contact />} />
            
            {/* Blog Routes */}
            <Route path='/Blog/*' element={<Blog />} />
            
            {/* Admin Routes */}
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </AppContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;