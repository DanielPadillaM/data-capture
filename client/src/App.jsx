import { BrowserRouter, Routes, Route } from "react-router";
import {
  LoginPage,
  Home,
  RegisterPage,
  CustomersPage,
  CustomerFormPage,
} from "./pages";


import { AuthProvider, CustomersProvider } from "./context";

import { ProtectedRoute } from "./ProtectedRoute";

import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <CustomersProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto py-10 px-7">
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

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
