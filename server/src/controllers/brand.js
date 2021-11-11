const { brand, link } = require("../../models/");
var crypto = require("crypto");

// update brand
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    await brand.update(req.body, {
      where: { id },
    });

    res.send({
      status: "success",
      message: `Update brand id: ${id} finished`,
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

// Delet brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await brand.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete brand with id ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// addBrandLink
exports.addBrandLink = async (req, res) => {
  var id = crypto.randomBytes(20).toString("hex");

  const data = req.body;
  try {
    const dataBrand = {
      name: data.name,
      description: data.description,
      image: req.files[0].filename,
      viewCount: 0,
      uniequeLink: id,
      userId: req.idUser,
    };

    const titleLink = data.title;
    const urlLink = data.link;
    let imageLink = req.files;
    imageLink.splice(0, 1);

    const newBrand = await brand.create(dataBrand);

    imageLink.map(async (item, idx) => {
      const title = titleLink.map((title) => {
        return title;
      });

      const dataLink = urlLink.map((link) => {
        return link;
      });

      await link.create({
        title: title[idx],
        link: dataLink[idx],
        image: imageLink[idx].filename,
        brandId: newBrand.id,
        createdBy: req.idUser,
      });
    });
    res.send({
      brandLink: { data },
      status: "success",
      message: "Add  Brand Link success",
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateVisitBrand = async (req, res) => {
  try {
    const idUser = req.userId;
    const { id } = req.params;

    const findOneBrand = await brand.findOne({
      where: { id: id },
      attributes: ["viewCount"],
    });

    const updateViewCount = { viewCount: parseInt(findOneBrand.dataValues.viewCount) + 1 };

    // ======================
    await brand.update(updateViewCount, {
      where: { id: id },
    });

    res.send({
      status: "success",
      message: `Update brand id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// getBrandUserId
exports.getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const findOnebrand = await brand.findOne({
      where: { id: id },
      include: {
        model: link,
        as: "link_id",
      },
      attributes: {
        exclude: ["password", "updatedAt", "createdAt"],
      },
    });

    res.send({
      status: "success",
      data: findOnebrand,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
