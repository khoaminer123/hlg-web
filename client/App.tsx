
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModelHLG from './pages/ModelHLG';
import Contact from './pages/Contact';
import Mall from './pages/Mall';
import Search from './pages/Search';
import Shareholder from './pages/Shareholder';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model" element={<ModelHLG />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mall" element={<Mall />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/shareholder" element={<Shareholder />} />
            {/* Catch-all route showing Home for unimplemented paths */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
