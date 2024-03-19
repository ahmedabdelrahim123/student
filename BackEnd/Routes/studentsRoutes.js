const { Router } = require("express");
const express = require("express");
const router = express.Router();
const studentsController = require("../Controllers/studentsController");

router.get("/", studentsController.getAllStudents);

router.get("/:id", studentsController.getStudentById);

router.post("/create", studentsController.createStudent);

router.put("/:id", studentsController.updateStudent);

router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
