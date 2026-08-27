const { getLogic } = require("../controller/controller.js");

const routes = (req, res) => {
    getLogic(req, res);
};

module.exports = { routes };