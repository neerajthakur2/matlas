import Employee from "../models/employee.model.js";
// create employee controller
// Adjust the path to your schema file

export const createEmployee = async (req, res) => {
  try {
    const { name, age, email, position, salary } = req.body;

    // 1. Basic validation check for missing fields
    if (!name || !age || !email || !position || !salary) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // 2. Check if employee already exists (handles the unique email constraint gracefully)
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "An employee with this email already exists"
      });
    }

    // 3. Create and save the new employee document
    const newEmployee = await Employee.create({
      name,
      age,
      email,
      position,
      salary
    });

    // 4. Return successful response
    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee
    });

  } catch (error) {
    // 5. Catch any unexpected or validation errors
    return res.status(500).json({
      success: false,
      message: "Server error creating employee",
      error: error.message
    });
  }
};



// Get all employees controller

 // Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    // .find({}) fetches every document in the collection
    // .sort({ createdAt: -1 }) optional: puts the newest employees first
    const employees = await Employee.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


// Additional CRUD operations can be added here, such as:
// - getEmployeeById
// - updateEmployee
// - deleteEmployee
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;  
    Employee.findByIdAndDelete(id, (err, employee) => {
      if (err) {
        return res.status(500).json({

            success: false, 
            message: "Internal server error",
            error: err.message 
        });
      }
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }   
         return res.status(200).json({
            success: true,
            message:         "Employee deleted successfully"
             }
        );
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};