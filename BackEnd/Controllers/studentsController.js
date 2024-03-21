const Student = require('../Model/studentsModel');

exports.getAllStudents = (req, res) => {
  // Retrieve all students
  Student.findAll()
    .then(students => {
      if (!students || students.length === 0) {
        return res.status(404).json({ error: 'No Students found' });
      }
      res.status(200).json(students);
    })
    .catch(error => {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Error getting students' });
    });
};

exports.getStudentById = (req, res) => {
  const { id } = req.params; 
  Student.findByPk(id)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
    })
    .catch(error => {
      console.error('Error fetching student by ID:', error);
      res.status(500).json({ error: 'Error getting student' });
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
  const { fname, lname, birthdate, gender, email, country } = req.body; 
  Student.findByPk(id)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return Student.update(
        { fname, lname, birthdate, gender, email, country }, 
        { where: { id } } 
      );
    })
    .then(() => {
      res.status(200).json({ success: true, message: 'Student updated successfully' });
    })
    .catch(error => {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Error Updating student' });
    });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params; 
  Student.findByPk(id)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return Student.destroy({ where: { id } });
    })
    .then(() => {
      res.status(200).json({ success: true, message: 'Student deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Error deleting student' });
    });
};
