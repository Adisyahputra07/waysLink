const { user } = require("../../models/");

// get profile
exports.getUser = async (req, res) => {
  const id = req.idUser;
  const findOneUser = await user.findOne({
    where: { id },
    attributes: {
      exclude: ["password", "updatedAt", "createdAt"],
    },
  });

  res.send({
    status: "success",
    data: { findOneUser },
  });
  try {
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// update User
exports.updateUser = async (req, res) => {
  try {
    const id = req.idUser;
    const { body } = req;

    await user.update(body, {
      where: { id },
    });

    const updatedData = await user.findOne({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Update user id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// Delet user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.idUser;
    await user.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete user with id ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
