const CustomerModel = require("../../models/accounts/customer");
const AdminModel = require("../../models/accounts/admin");
const DeliveryAgentModel = require("../../models/accounts/deliveryAgent");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Accounts {
  static async register(req, res) {
    // Input from request body
    const { name, password, telephoneNumber, email } = req.body;

    // Verify input from request body
    if (!name || !password || !telephoneNumber || !email) {
      return res.status(400).json({
        error: "Input cannot be empty.",
      });
    }

    try {
      let passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          error: "Wrong password pattern.",
        });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Email already in use bu another account.",
        });
      }

      let user;
      let role;

      // Check if the user is an admin
      user = await AdminModel.findOne({ where: { email } });
      if (user) {
        role = "Admin";
      }

      // Check if the user is a customer
      if (!user) {
        user = await CustomerModel.findOne({ where: { email } });
        if (user) {
          role = "Customer";
        }
      }

      // Check if the user is a delivery agent
      if (!user) {
        user = await DeliveryAgentModel.findOne({ where: { email } });
        if (user) {
          role = "Delivery Agent";
        }
      }

      // If user is not found in any model
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      //   Check if user already exists
      let findByEmail = await CustomerModel.findByEmail(email);
      if (findByEmail) {
        return res.status(400).json({
          error: "User with this email already exists. ",
        });
      }

      let findByName = await CustomerModel.findByName(name);
      if (findByName) {
        return res.status(400).json({
          error: "Name taken. Try another.",
        });
      }

      //   Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      //   Create new user
      const newUser = await CustomerModel.create({
        email,
        password: hashedPassword,
        name,
        telephoneNumber,
      });

      const token = jwt.sign(
        { userId: user._id, role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(201).json({
        newUser,
        token,
        role,
        message: "Account created successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    // Input from request body
    const { email, password } = req.body;

    // Verify input from request body
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    try {
      // Check if user exists
      let user;
      user = await CustomerModel.findByEmail(email);
      if (user) {
        return res.status(400).json({
          error: "User's email found.",
        });
      }

      //   Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!password || !passwordMatch) {
        return res.status(400).json({
          error: "Invalid password.",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login successful.",
        id: user.id,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error.error,
      });
    }
  }

  static async protect(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findByPk(decoded.userId);
    if (!req.user) return res.status(401).json({ error: "Invalid token" });

    next();
  }
  //   Get user by ID
  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await CustomerModel.findById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        error: "Server error. Could not fetch user",
      });
    }
  }

  //   Update user profile
  static async updateUser(req, res) {
    const { id } = req.params;
    const { email, name } = req.body;

    try {
      const user = await CustomerModel.findById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found.",
        });
      }
      user.email = email || user.email;
      user.name = name || user.name;
      await user.save();

      return res.status(200).json({
        message: "User profile updated.",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server error. Could not update user.",
      });
    }
  }
}
module.exports = Accounts;
