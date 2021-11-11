const { user } = require("../../models");

const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { body } = req;

    const schema = joi.object({
      fullName: joi.string().min(5).required(),
      email: joi.string().email().min(6).required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    const { email, password } = body;
    const emailCheck = await user.findOne({ where: { email: email } });

    if (emailCheck) {
      return res.status(400).send({
        message: "email already registered",
      });
    }

    // about password
    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const items = await user.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: items.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      message: "resource successfully create account",
      items: {
        data: items,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Register Failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(userData);

    if (error) {
      return res.status(400).send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.status(400).send({
        status: "failed",
        message: "Email Or Password Don't Match",
      });
    }
    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.status(400).send({
        status: "failed",
        message: "Email Or Password Don't Match",
      });
    }
    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      status: "success",
      message: "resource successfully login",
      items: {
        profile: checkEmail,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot Sign In",
    });
  }
};
