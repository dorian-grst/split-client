import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from '@/pages/App/Overview';
import Login from '@/pages/Auth/Login';
import SignUp from '@/pages/Auth/SignUp';
import Error from '@/pages/Auth/Error';
import Equality from '@/pages/App/Equality';
import Settings from '@/pages/App/Settings';
import Account from '@/pages/App/Account';
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/teamId" element={<Overview />} />
                <Route path="/teamID/equality" element={<Equality />} />
                <Route path="/teamID/settings" element={<Settings />} />
                <Route path="/teamID/account" element={<Account />} />

                <Route path="/error" element={<Error />} />
            </Routes>
            <Toaster />
        </main>
    );
}
