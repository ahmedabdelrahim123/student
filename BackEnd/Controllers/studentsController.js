const Student = require('../Model/studentsModel');
const studentSchema = require('../Utils/studentsValidation');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['updatedAt', 'DESC']]
    });
    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No Students found' });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error getting students' });
  }
};


exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ error: 'Error getting student' });
  }
};

exports.createStudent = async (req, res) => {
  const studentData = req.body;
  const valid = studentSchema(studentData);
  if (!valid) {
    return res.status(400).json({ error: 'Invalid student data', details: studentSchema.errors });
  }

  try {
    const createdStudent = await Student.create(studentData);
    res.status(201).json({ message: 'Student created successfully', student: createdStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error Creating student' });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const studentData = req.body;
  const valid = studentSchema(studentData);
  if (!valid) {
    return res.status(400).json({ error: 'Invalid student data', details: studentSchema.errors });
  }

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await Student.update(studentData, { where: { id } });
    res.status(201).json({ message: 'Student updated successfully', student: studentData });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error Updating student' });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await Student.destroy({ where: { id } });
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};
