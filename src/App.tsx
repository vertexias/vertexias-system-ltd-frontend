// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Login } from '@/pages/Login';
import Admin from '@/pages/admin/Admin';
import Index from './pages/Index';
import { config } from '@/utils/config';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Job from './pages/admin/Job';
import Contact from './pages/admin/Contact';
import {Toaster} from "sonner";

function App() {
  return (
    <>
    <Router>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Routes>
          {/* Main website with navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Index />
            </>
          } />
          
          {/* Login page - no navbar */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin route - use the exact path from config */}
          <Route 
            path={`/${config.admin.path}`} 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />


          {/* Admin Jobs Page - Protected, Separate Route */}
          <Route 
            path={`/${config.admin.path}/jobs`} 
            element={
              <ProtectedRoute>
                <Job />
              </ProtectedRoute>
            } 
          />
          <Route 
            path={`/${config.admin.path}/contacts`} 
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
      </ThemeProvider>
    </Router>
    <Toaster position="top-right" />
    </>
  );
}

export default App;