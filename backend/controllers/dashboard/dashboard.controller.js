// controllers/dashboard.controller.js
const dashboardService = require("../../services/dashboard/dashboard.service");
const base = require("../base.controller");


exports.getDashboardSummary = async (req, res) => {

  console.log("req===========");
  console.log(req);
  
  try {
    const data = await dashboardService.getSummary(req.user.client_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
