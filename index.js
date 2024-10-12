const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(express.json());

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
