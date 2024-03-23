const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

// Connect to MySQL database
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Define the Student model
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error syncing Student model:', error);
  }
})();

module.exports = Student;
