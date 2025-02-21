import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Home from './components/Home.jsx';
import './index.css';
import Login from './pages/Login.jsx';
import Upload from './pages/Upload.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Home />}>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="upload" element={<Upload />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
