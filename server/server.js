require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/configs/database");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
