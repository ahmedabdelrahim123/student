const Student = require('../Model/studentsModel');

exports.getAllStudents = (req, res) => {
  Student.getAll((students) => {
    res.json(students);
  });
};

exports.getStudentById = (req, res) => {
  const { id } = req.params;
  Student.getById(id, (student) => {
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  });
};

exports.createStudent = (req, res) => {
  const studentData = req.body;
  Student.create(studentData, (id) => {
    res.status(201).json({ message: 'Student created successfully', id });
  });
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const studentData = req.body;
  Student.update(id, studentData, () => {
    res.json({ message: 'Student updated successfully' });
  });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  Student.getById(id, (student) => {
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    Student.delete(id, () => {
      res.json({ message: 'Student deleted successfully' });
    });
  });
};
