import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
