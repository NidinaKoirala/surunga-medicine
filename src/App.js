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
          
          </Routes>
        </AppContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;