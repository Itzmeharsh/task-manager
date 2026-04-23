const User = require("./user.model");
const Task = require("./task.model");

// Relationship
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Task };