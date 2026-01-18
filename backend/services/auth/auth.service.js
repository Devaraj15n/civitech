const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user_master: User, client_master: Client } = require("../../models");
const { Op } = require("sequelize");

exports.login = async ({ phone, password }) => {
  if (!phone || !password) throw new Error("phone and password are required");

  const user = await User.findOne({
    where: {
      deleted_at: null,
      status: 1,
      [Op.or]: [{ phone: phone }],
    },
    include: [
      {
        model: Client,
        as: "client",
        attributes: ["id", "client_name", "status"],
      },
    ],
  });

  if (!user) throw new Error("Invalid credentials");

  if (user.client.status !== 1) throw new Error("Client account is inactive");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid credentials");

  const tokenPayload = {
    user_id: user.id,
    client_id: user.client_id,
    party_id: user.party_id,
    user_type: user.user_type,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  await user.update({ last_login_at: new Date() });

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      user_type: user.user_type,
      party_id: user.party_id,
    },
    client: {
      id: user.client.id,
      name: user.client.client_name,
    },
  };
};
