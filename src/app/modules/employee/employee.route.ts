import express from "express";
import { ENUM_EMPLOYEE_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { employeeController } from "./employee.controller";
import { employeeZodValidation } from "./imployee.validation";

const router = express.Router();

router.post(
  "/create-employee",
  validateRequest(employeeZodValidation.createEmployeeZodValidation),
  employeeController.createEmployeeController
);
router.get(
  "/",
  auth(
    ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
    ENUM_EMPLOYEE_ROLE.SUPERVISOR,
    ENUM_EMPLOYEE_ROLE.EMPLOYEE
  ),
  employeeController.getAllEmployeeController
);
router.get(
  "/supervisor",
  auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR),
  employeeController.getAllSupervisorController
);
router.get(
  "/administrator",
  auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR),
  employeeController.getAllAdministratorController
);
router.get(
  "/:id",
  auth(
    ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
    ENUM_EMPLOYEE_ROLE.SUPERVISOR,
    ENUM_EMPLOYEE_ROLE.EMPLOYEE
  ),
  employeeController.getSingleEmployeeController
);
router.patch(
  "/:id",
  auth(
    ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
    ENUM_EMPLOYEE_ROLE.SUPERVISOR,
    ENUM_EMPLOYEE_ROLE.EMPLOYEE
  ),
  validateRequest(employeeZodValidation.updateEmployeeZodValidation),
  employeeController.updateEmployeeController
);
router.delete(
  "/:id",
  auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR),
  employeeController.deleteEmployeeController
);

router.patch(
  "/password-change/:id",
  auth(
    ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
    ENUM_EMPLOYEE_ROLE.SUPERVISOR,
    ENUM_EMPLOYEE_ROLE.EMPLOYEE
  ),
  employeeController.passwordChangeController
);

export const employeeRoutes = router;
