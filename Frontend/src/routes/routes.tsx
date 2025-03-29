import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Home } from "../pages/Home";
import  SignIn  from "../pages/auth/signin";
import  SignUp from "../pages/auth/signup";
import DashboardLayout  from "../components/Layout/DashboardLayout";
import  Dashboard  from "../pages/dashboard/DashboardHome";
import  Clientes  from "../pages/dashboard/Clientes/Clientes";
import  Projetos  from "../pages/dashboard/Projetos/Projetos";
import  TimeSheet  from "../pages/dashboard/TimeSheet/TimeSheet";
import  Faturas  from "../pages/dashboard/Faturas";
import  Relatorios  from "../pages/dashboard/Relatorios";



const RoutesComponent = () => {

    const {authuser,CheckAuth,isCheckAuth} =  useAuthStore()
    useEffect(() => {
        CheckAuth()
      },[CheckAuth])
    
    if(isCheckAuth && !authuser){
        return(
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
        )
    } 

  return (
    <div>
        <Routes >

          <Route path="/" element={!authuser ?  <Home /> : <Navigate to={'/dashboard'} />}/> 
          <Route path="/signup" element={!authuser ? <SignUp  /> : <Navigate to={'/dashboard'} />} />
          <Route path="/signin" element={!authuser ?  <SignIn/> : <Navigate to={'/dashboard'} />} />
         
          <Route path="/dashboard" element={authuser ?  <DashboardLayout/> : <Navigate to={'/'} />}>
              <Route index element={<Dashboard />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="projetos" element={<Projetos />} />
              <Route path="timesheet" element={<TimeSheet />} />
              <Route path="faturas" element={<Faturas />} />
              <Route path="relatorios" element={<Relatorios />} />
            </Route>


        </Routes>
      
    </div>
  )
}


export default RoutesComponent