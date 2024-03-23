const Ajv = require("ajv");
const ajv = new Ajv();

ajv.addFormat("date", {
    type: "string",
    validate: value => {
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }
  });
  ajv.addFormat("email", {
    type: "string",
    validate: value => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
  });
const studentSchema = {
    type: "object",
    properties: {
      id: { type: "number" },
      fname: { type: "string" },
      lname: { type: "string" },
      birthdate: { type: "string", format: "date" },
      gender: { type: "string", enum: ["male", "female"] },
      email: { type: "string", format: "email" },
      country: { type: "string" }
    },
    required: ["fname", "lname", "birthdate", "gender", "email", "country"],
    additionalProperties: false,
  };

module.exports = ajv.compile(studentSchema);
