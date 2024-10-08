const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./model/User");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Database connection established`))
  .catch((error) => console.log(`Database connection failed ${error.message}`));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Server listener
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

// Signup route
app.post("/signup/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name + " " + email + " " + password);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post("/login/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (user) {
      // Compare passwords
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        req.session.user = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        res.status(200).json("success");
      } else {
        res.status(401).json("Password does not match");
      }
    } else {
      res.status(401).json("No records found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Add error response
    console.log(error.message);
  }
});

// Get authenticated user route
app.get("/user/", async (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json("Not authenticated");
  }
});

// for Logout:
app.post("/logout/", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.status(200).json("Logout successfully");
      }
    });
  } else {
    res.status(400).json("Not authenticated");
  }
});
