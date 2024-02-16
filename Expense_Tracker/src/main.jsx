import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import './App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Components/Home/Home.jsx';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import Authprovider from './Components/Provider/AuthProvider.jsx';
import SignUp from './Components/Authentication/Signup/Signup.jsx';
import Login from './Components/Authentication/Login/Login.jsx';
import App from './App.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import DashboardHome from './Components/Dashboard/DashboardHome/DashboardHome.jsx';
import Incomes from './Components/Dashboard/Incomes/Incomes.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import UpdateIncome from './Components/Dashboard/Incomes/UpdateIncome.jsx';
import Expenses from './Components/Dashboard/Expenses/Expenses.jsx';
import UpdateExpense from './Components/Dashboard/Expenses/UpdateExpense.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: '/',
        element:  <Home/> 
      },
      {
        path:"/signup",
        element: <SignUp/>
      },
      {
        path:"/login",
        element: <Login/>
      }
      
      
    ]
  },
  {
    path:"dashboard",
    element: <Dashboard/>,
    children:[
      {
        path:"dashboardhome",
        element: <DashboardHome/>
      },
      {
        path: 'incomes',
        element: <Incomes/>
      },
      {
        path: 'updateincome/:id',
        element: <UpdateIncome/>,
        loader: ({params}) => fetch(`https://expense-tracker-server-xi.vercel.app/incomes/${params.id}`)
      },
      {
        path: 'expenses',
        element: <Expenses/>
      },
      ,
      {
        path: 'updateexpense/:id',
        element: <UpdateExpense/>,
        loader: ({params}) => fetch(`https://expense-tracker-server-xi.vercel.app/expenses/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Authprovider>
        <RouterProvider router={router} />
     </Authprovider>
  </React.StrictMode>,

)
