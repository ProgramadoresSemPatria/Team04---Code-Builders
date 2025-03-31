import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { JSX, useEffect } from "react";
import { Loader } from "lucide-react";
import { Home } from "../pages/Home";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../pages/dashboard/DashboardHome";
import Clientes from "../pages/dashboard/Clientes/Clientes";
import Projetos from "../pages/dashboard/Projetos/Projetos";
import TimeSheet from "../pages/dashboard/TimeSheet/TimeSheet";
import Perfil from "../pages/dashboard/Perfil/Perfil";
// import Success from "@/pages/payment/Success";
import Payment from "@/pages/payment/Payment";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authuser } = useAuthStore();
  return authuser ? children : <Navigate to="/signin" />;
};

const RoutesComponent = () => {
  const { authuser, CheckAuth, isCheckAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  if (isCheckAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Se o usuário está autenticado mas não pagou, redireciona para /payment
  if (authuser && !authuser.isPaymentDone && !["/payment", "/success"].includes(location.pathname)) {
    return <Navigate to="/payment" />;
  }


  return (
    <div>
      <Routes>
        {/* Se não estiver autenticado, pode acessar Home */}
        <Route path="/" element={!authuser ? <Home /> : <Navigate to="/dashboard" />} />
        
        {/* Se não estiver autenticado, pode acessar Signup e Signin */}
        <Route path="/signup" element={!authuser ? <SignUp /> : <Navigate to="/dashboard" />} />
        <Route path="/signin" element={!authuser ? <SignIn /> : <Navigate to="/dashboard" />} />

        {/* Página de pagamento: apenas acessível se o usuário não tiver pago */}
        <Route path="/payment" element={authuser && !authuser.isPaymentDone ? <Payment /> : <Navigate to="/dashboard" />} />

        <Route path="/success" element={<Payment />} />

        {/* Dashboard e páginas protegidas */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="timesheet" element={<TimeSheet />} />
          <Route path="perfil" element={<Perfil />} />
        
        </Route>
      </Routes>
    </div>
  );
};

export default RoutesComponent;
