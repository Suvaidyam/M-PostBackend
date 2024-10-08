const Environment = require('../../Model/Environment');
const mongoose = require('mongoose')
module.exports = {
  getAllEnvironment: async (req, res) => {
    try {
      let environment = await Environment.find();
      return res.status(200).json({ message: "All environment list", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getEnvironment: async (req, res) => {
    try {
      let environment = await Environment.find(req.params);
      return res.status(200).json({ message: "environment list", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  postEnvironment: async (req, res) => {
    let created_by = req.decoded._id
    let { name, details, variable, value, current_value, workspace_id } = req.body
    try {
      let environment = await Environment.create({ name, variable, value, current_value, created_by, details, workspace_id });
      return res.status(200).json({ message: name + " Created Successfully", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  putEnvironment: async (req, res) => {
    try {
      let environment = await Environment.updateOne(req.params, req.body);
      return res.status(200).json({ message: "Update Successfully", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  softDelete: async (req, res) => {
    try {
      let environment = await Environment.findByIdAndUpdate(req.params, { $set: { deleted: true } }, { new: true });
      return res.status(200).json({ message: "Delete Successfully", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  restore: async (req, res) => {
    try {
      let environment = await Environment.findByIdAndUpdate(req.params, { $set: { deleted: false } }, { new: false });
      return res.status(200).json({ message: "Delete Successfully", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteEnvironment: async (req, res) => {
    try {
      let environment = await Environment.deleteOne(req.params);
      return res.status(200).json({ message: "Deleted Successfully", environment: environment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
}