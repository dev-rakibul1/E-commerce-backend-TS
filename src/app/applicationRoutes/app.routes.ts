import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { employeeRoutes } from "../modules/employee/employee.route";
import { getAuthRoutes } from "../modules/getAuth/getAuth.route";
import { shiftRoutes } from "../modules/shift/shift.route";

const applicationRoutes = express.Router();

const moduleRoutes = [
  {
    path: "/employee",
    route: employeeRoutes,
  },
  {
    path: "/shift",
    route: shiftRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/get-auth",
    route: getAuthRoutes,
  },
];

moduleRoutes.forEach((route) => applicationRoutes.use(route.path, route.route));
export default applicationRoutes;
