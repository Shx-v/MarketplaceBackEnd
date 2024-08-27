import Order from "../models/Order.js";

const createOrder = async (req, res) => {
  try {
    const { user, service, amount, paymentMethod, transactionId } = req.body;

    const newOrder = new Order({
      user,
      service,
      amount,
      paymentMethod,
      transactionId,
    });

    await newOrder.save();

    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "Order created successfully !",
        data: {
          order: newOrder,
        },
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while creating order.",
      },
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName")
      .populate("service", "name provider description category price features noOfRating rating createdAt updatedAt");

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Successfully fetched orders !",
        data: {
          order: orders,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching orders.",
      },
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "firstName lastName")
      .populate("service", "name");

    if (!order) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Successfully fetched order !",
        data: {
          order,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching order.",
      },
    });
  }
};

const getOrderByBuyer = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id }).populate("service", "name");

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Successfully fetched orders !",
        data: {
          orders,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching order.",
      },
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, amount, paymentMethod } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, amount, paymentMethod, updatedAt: Date.now() },
      { new: true }
    )
      .populate("user", "firstName lastName")
      .populate("service", "name");

    if (!updatedOrder) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Order updated successfully !",
        data: {
          order: updateOrder,
        },
      },
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while updating order.",
      },
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "Order not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Order deleted successfully.",
      },
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while deleting order.",
      },
    });
  }
};

export {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByBuyer,
  updateOrder,
  deleteOrder,
};
