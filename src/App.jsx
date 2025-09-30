import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AdminAuth from './components/AdminAuth/AdminAuth';
import HomePage from './pages/Home/Home';
import './App.css';
import Blog from './pages/Blog/Blog';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<AdminAuth />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path='/blog' element={<Blog/>}/>
            {/* 404 Route - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;