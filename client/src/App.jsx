import { BrowserRouter, Routes, Route } from "react-router";
import {
  AuthPage,
  CustomersPage,
  CustomerFormPage,
} from "./pages";


import { AuthProvider, CustomersProvider } from "./context";

import { ProtectedRoute } from "./ProtectedRoute";

import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <CustomersProvider>
        <BrowserRouter>
          <Navbar />
          <main >
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="register" element={<AuthPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<h1>profile</h1>} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="add-customer" element={<CustomerFormPage />} />
                <Route path="customers/:id" element={<CustomerFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </CustomersProvider>
    </AuthProvider>
  );
};

export default App;
