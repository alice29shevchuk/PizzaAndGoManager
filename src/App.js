import './App.css';
import Admin from "./pages/AdminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from './pages/AdminPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminPage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
