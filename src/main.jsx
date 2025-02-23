import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Home from './components/Home.jsx';
import { AuthProvider } from './helper/AuthContext.jsx';
import './index.css';
import Login from './pages/Login.jsx';
import Upload from './pages/Upload.jsx';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="${GOOGLE_CLIENT_ID}">
    <AuthProvider>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="upload" element={<Upload />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);
