import LayoutDefault from "../layouts/default/layoutDefault";
import PrivateRoute from "../components/privateRoute/privateRoute";
import Users from "../pages/Users";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Unauthorized from "../pages/Unauthorized";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Appointments from "../pages/Appointments";
import MedicalRecord from "../pages/MedicalRecord";
import Examination from "../pages/Examination";
import ExaminationDetail from "../pages/ExaminationDetail";
import AppointmentsPatient from "../pages/AppointmentsPatient";
import Medicine from "../pages/Medicine";
import Orders from "../pages/Orders";
import ProfileMedical from "../pages/ProfileMedical";
import Patient from "../pages/Patient";
import Calendar from "../pages/Calendar";
import Statistic from "../pages/Statistic";

const routes = [
    {
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <PrivateRoute element={<Home />} />,
            },
            {
                path: "/profile",
                element: <PrivateRoute element={<Profile />} />,
            },
            {
                path: "/change-password",
                element: <PrivateRoute element={<ChangePassword />} />,
            },
            {
                path: "/users",
                element: <PrivateRoute element={<Users />} permissionRequired={['admin']} />,
            },
            {
                path: "/appointments",
                element: <PrivateRoute element={<Appointments />} permissionRequired={['user']} />,
            },
            {
                path: "/medical-record",
                element: <PrivateRoute element={<MedicalRecord />} permissionRequired={['user']} />,
            },
            {
                path: "/calendar",
                element: <PrivateRoute element={<Calendar />} permissionRequired={['doctor']} />,
            },
            {
                path: "/examination",
                element: <PrivateRoute element={<Examination />} permissionRequired={['doctor']} />,
            },
            {
                path: "/examination/:id",
                element: <PrivateRoute element={<ExaminationDetail />} permissionRequired={['doctor']} />,
            },
            {
                path: "/appointments-patient",
                element: <PrivateRoute element={<AppointmentsPatient />} permissionRequired={['staff']} />,
            },
            {
                path: "/profile-medical",
                element: <PrivateRoute element={<ProfileMedical />} permissionRequired={['staff']} />,
            },
            {
                path: "/profile-medical/:id",
                element: <PrivateRoute element={<Patient />} permissionRequired={['staff']} />,
            },
            {
                path: "/statistic",
                element: <PrivateRoute element={<Statistic />} permissionRequired={['sales']} />,
            },
            {
                path: "/medicine",
                element: <PrivateRoute element={<Medicine />} permissionRequired={['sales']} />,
            },
            {
                path: "/orders",
                element: <PrivateRoute element={<Orders />} permissionRequired={['sales']} />,
            },
        ]
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]

export default routes;