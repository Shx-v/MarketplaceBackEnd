import Subscription from "../models/Subscription.js";

const createOrder = async (req, res) => {
  try {
    const { user, service, amount } = req.body;

    const newSubscription = new Subscription({
      user,
      service,
      amount,
    });

    await newSubscription.save();

    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "Subscription created successfully.",
        data: {
          subscription: newSubscription,
        },
      },
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while creating subscription.",
      },
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "firstName lastName")
      .populate("service", "name");

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Subscription fetched successfully.",
        data: {
          subscription: subscriptions,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching subscriptions.",
      },
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("user", "firstName lastName")
      .populate("service", "name");

    if (!subscription) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Subscription not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Subscription fetched successfully !",
        data: {
          subscription,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching subscription.",
      },
    });
  }
};

const getSubscriptionBySubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    const subscriptions = await Subscription.find({ user: id })
      .populate("user", "firstName lastName")
      .populate("service", "name");

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Successfully fetched subscriptions !",
        data: {
          subscriptions,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching subscription.",
      },
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, endDate, amount, paymentMethod } = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status, endDate, amount, paymentMethod, updatedAt: Date.now() },
      { new: true }
    )
      .populate("user", "firstName lastName")
      .populate("service", "name");

    if (!updatedSubscription) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Subscription not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Subscription updated successfully !",
        data: {
          subscription: updatedSubscription,
        },
      },
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while updating subscription.",
      },
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    );

    if (!deletedSubscription) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Subscription not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Subscription deleted successfully.",
      },
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while deleting subscription.",
      },
    });
  }
};

export {
  createOrder,
  getAllOrders,
  getOrderById,
  getSubscriptionBySubscriber,
  updateOrder,
  deleteOrder,
};
