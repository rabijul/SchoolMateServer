const { sql, getConnection } = require("../config/GetSqlConnection.js");

class SharedRepository {

  static async getAllSchoolsInfo(req, res) {
    try {
      const connectionPool = await getConnection();
      //console.log(connectionPool);
      const result = await connectionPool
        .request()
        .query("SELECT * FROM SchoolsInfo");

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No Records found" });
      }

      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching the data:", error);
      return res
        .status(500)
        .json({ message: "Error fetching Schools details: " + error.message });
    }
  }

  static async SharedUsersInfo(req, res) {
    try {
      const connectionPool = await getConnection();
      //console.log(connectionPool);
      const result = await connectionPool
        .request()
        .query("SELECT * FROM UsersInfo");

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No Records found" });
      }

      res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching the data:", error);
      return res
        .status(500)
        .json({ message: "Error fetching Schools details: " + error.message });
    }
  }

  static async testerrorhandler(req, res) {   
    throw new Error('This is a test error for error handler!');
  }
 
  static async getSchoolById(req, res) {
    try {
      const { id } = req.params;
      const connectionPool = await getConnection();
      const result = await connectionPool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Employees WHERE EmployeeID = @id");
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(result.recordset[0]);
    } catch (error) {
      throw new Error("Error fetching employees: " + error.message);
      console.log(error.message);
    }
  }

  static async saveSchoolInfo(req, res) {
    try {
      const {
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        HireDate,
        Salary,
        DepartmentID,
        CreatedDate,
        Gender,
      } = req.body;
      const connectionPool = await getConnection();
      const result = await connectionPool
        .request()
        .input("firstName", sql.NVarChar, firstName)
        .input("lastName", sql.NVarChar, lastName)
        .input("email", sql.NVarChar, email)
        .query(
          "INSERT INTO Employees (FirstName, LastName, Email) VALUES (@firstName, @lastName, @email); SELECT SCOPE_IDENTITY() AS EmployeeID"
        );

      // Get the new employee ID (from SCOPE_IDENTITY())
      const newEmployeeId = result.recordset[0].EmployeeID;

      res
        .status(201)
        .json({ message: "Employee created", employeeId: newEmployeeId });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error saving employee: " + error.message });
    }
  }

  static async updateSchoolInfo(req, res) {
    try {
      const { id } = req.params; // Get the employee ID from URL params
      const { firstName, lastName, email } = req.body; // Get updated fields from request body

      const connectionPool = await getConnection();
      const result = await connectionPool
        .request()
        .input("id", sql.Int, id)
        .input("firstName", sql.NVarChar, firstName)
        .input("lastName", sql.NVarChar, lastName)
        .input("email", sql.NVarChar, email)
        .query(
          "UPDATE Employees SET FirstName = @firstName, LastName = @lastName, Email = @email WHERE EmployeeID = @id"
        );

      // Check if any rows were affected
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ message: "Employee updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating employee: " + error.message });
    }
  }

  static async deleteSchool(req, res) {
    try {
      const { id } = req.params; // Get the employee ID from URL params

      const connectionPool = await getConnection();
      const result = await connectionPool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Employees WHERE EmployeeID = @id");

      // Check if any rows were affected
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting employee: " + error.message });
    }
  }
}

// Use module.exports for exporting in CommonJS
module.exports = SharedRepository;
