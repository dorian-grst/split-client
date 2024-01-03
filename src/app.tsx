import { Route, Routes } from 'react-router-dom';
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
import SplitProvider from './context/SplitProvider';

export default function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/dashboard" element={<SplitProvider><Dashboard /></SplitProvider>} />
                <Route path="/splits/:id" element={<SplitProvider><Overview /></SplitProvider>} />
                <Route path="/splits/:id/equality" element={<SplitProvider><Equality /></SplitProvider>} />
                <Route path="/splits/:id/settings" element={<SplitProvider><Settings /></SplitProvider>} />
                <Route path="/splits/:id/account" element={<SplitProvider><Account /></SplitProvider>} />

                <Route path="/error" element={<Error />} />
            </Routes>
            <Toaster />
        </main>
    );
}
