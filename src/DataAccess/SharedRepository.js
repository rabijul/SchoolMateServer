const {
  sql,
  getDBConnection,
  getSharedConnection,
} = require("../config/GetSqlConnection.js");

class SharedRepository {
  static async getAllSchoolsInfo(req, res) {
    try {
      const connectionPool = await getSharedConnection();
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
      const connectionPool = await getSharedConnection();
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
    throw new Error("This is a test error for error handler!");
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

  static async loginUserValidation(req, res) {
    try {
      const { username, password } = req.body;
      console.log("Username:", username);
      console.log("Password:", password);
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const connectionPool = await getSharedConnection();

      console.log(username);
      console.log(password);
      const result = await connectionPool
        .request()
        .input("UserName", sql.VarChar, username) // sanitize username input
        .query(
          "SELECT S.DBName FROM UsersInfo U join SchoolsInfo S ON U.schoolID = S.schoolID WHERE email = 'rabijul@gmail.com'"
        );

      console.log(result);
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "User not found" });
      } else {
        console.log(
          "User found and CLient DB is: ",
          result.recordset[0]?.DBName
        );
        const clientDBName = result.recordset[0]?.DBName;
        const clientDBConnection = await getDBConnection(clientDBName);
        console.log(clientDBConnection)
        console.log(
          `the sql query is :  SELECT * from  UsersInfo WHERE email = 'rabijul@gmail.com'`
        );
        const userResult = await clientDBConnection
          .request()
          .input("UserName", sql.VarChar, username) 
          .query(`SELECT * from UsersInfo WHERE email = 'rabijul@gmail.com'`);
        //const connectionPool = await getDBConnection('');
        if (userResult.recordset.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        const user = userResult.recordset[0];
        console.log("line 201, User found:", user);
        console.log(`database password is : ${user.password} `);
        console.log(`UI password is : ${password} `);
        console.log(`Equal?`, user.password.trim() === password.trim());
        if (user.password.trim() === password.trim()) {
          return res.status(200).json({ message: "Login successful", user });
        } else {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
      }

      // const user = result.recordset[0];
      // const encryptedData = user.Password;
      // const key = process.env.ENCRYPTION_KEY;
      // const iv = user.IV;
      // const authTag = user.AuthTag;

      // const { DecryptedPassword } = await UtilitiesRepository.decryptData(
      //   encryptedData,
      //   key,
      //   iv,
      //   authTag
      // );

      // console.log(password);
      // console.log(DecryptedPassword);

      // if (String(password) !== String(DecryptedPassword)) {
      //   console.log("Inside If Condition");
      //   return res.status(401).json({ message: "Invalid credentials" });
      // }
      // const userinfo = {
      //   authenticated: true,
      //   role: user.RoleID === 3 ? "Admin" : "other", // Ensure you use '===' for strict equality comparison
      // };

      // console.log(userinfo);

      res.json({ message: "Login successful", userResult });
    } catch (error) {
      console.error("Error during user login: ", error);
      return res
        .status(500)
        .json({ message: "Error during user login: " + error.message });
    }
  }
}

// Use module.exports for exporting in CommonJS
module.exports = SharedRepository;
