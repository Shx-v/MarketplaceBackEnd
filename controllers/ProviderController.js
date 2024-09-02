import Provider from "../models/Provider.js";

const createProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProvider = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
  deleteProvider,
};
