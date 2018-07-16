const app = require("./app");
const PORT = 3000;

const server = app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
