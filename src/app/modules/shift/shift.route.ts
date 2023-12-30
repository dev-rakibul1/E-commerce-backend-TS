import express from "express";
import { ENUM_EMPLOYEE_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { shiftController } from "./shift.controller";
import { validateShiftOverlap } from "./shift.overlop";

const router = express.Router();

router.post(
  "/create-shift",
  // auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR, ENUM_EMPLOYEE_ROLE.SUPERVISOR),
  validateShiftOverlap,
  shiftController.createShiftController
);
router.get(
  "/",
  // auth(
  //   ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
  //   ENUM_EMPLOYEE_ROLE.SUPERVISOR,
  //   ENUM_EMPLOYEE_ROLE.EMPLOYEE
  // ),
  shiftController.getAllShiftController
);
router.get(
  "/:id",
  // auth(
  //   ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
  //   ENUM_EMPLOYEE_ROLE.SUPERVISOR,
  //   ENUM_EMPLOYEE_ROLE.EMPLOYEE
  // ),
  shiftController.getSingleShiftController
);

router.get(
  "/filter-by-employee/:id",
  // auth(
  //   ENUM_EMPLOYEE_ROLE.ADMINISTRATOR,
  //   ENUM_EMPLOYEE_ROLE.SUPERVISOR,
  //   ENUM_EMPLOYEE_ROLE.EMPLOYEE
  // ),
  shiftController.filterByEmployeeShiftController
);

router.patch(
  "/:id",
  // auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR, ENUM_EMPLOYEE_ROLE.SUPERVISOR),
  validateShiftOverlap,
  shiftController.updateShiftController
);
router.delete(
  "/:id",
  auth(ENUM_EMPLOYEE_ROLE.ADMINISTRATOR),
  shiftController.deleteShiftController
);

export const shiftRoutes = router;
