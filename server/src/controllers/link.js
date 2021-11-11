const { link, brand } = require("../../models/");

// getONe
exports.getLink = async (req, res) => {
  const { id } = req.params;

  const findLink = await link.findAll({
    where: { brandId: id },
    attributes: {
      exclude: ["updatedAt", "createdAt"],
    },
  });

  res.send({
    status: "success",
    data: { findLink },
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

// Delet Link
exports.deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    await link.destroy({
      where: {
        id: id,
      },
    });

    res.send({
      status: "success",
      message: `Delete Link with id ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get links
exports.getMyLinks = async (req, res) => {
  const id = req.idUser;
  console.log(id);
  const findAllLink = await link.findAll({
    where: {
      createdBy: id,
    },
    include: {
      model: brand,
      as: "links_id",
    },
    attributes: {
      exclude: ["password", "updatedAt", "createdAt"],
    },
  });

  res.send({
    status: "success",
    data: findAllLink,
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
