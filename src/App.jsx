import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Signup from "./pages/Signup";
import Navbar from "./myComponents/Navbar";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Providers from "./pages/Providers";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import { toast, Toaster } from 'sonner'



function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col">

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster richColors position="bottom-center" />

    </div>
  );
}

export default App;
