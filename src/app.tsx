import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Overview from '@/pages/App/Overview';
import Login from '@/pages/Auth/Login';
import SignUp from '@/pages/Auth/SignUp';
import Error from '@/pages/Auth/Error';
import Equality from '@/pages/App/Equality';
import Settings from '@/pages/App/Settings';
import Account from '@/pages/App/Account';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/App/Dashboard';
import Home from './pages/App/Home';

export default function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/splits/:id" element={<Overview />} />
                <Route path="/splits/:id/equality" element={<Equality />} />
                <Route path="/splits/:id/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />

                <Route path="/error" element={<Error />} />
            </Routes>
            <Toaster />
        </main>
    );
}
