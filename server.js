const express = require("express");
const path = require("path");
const complaintRoutes = require("./routes/complaints");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Mount routes
app.use("/complaints", complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
