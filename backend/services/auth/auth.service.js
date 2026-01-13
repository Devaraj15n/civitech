const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user_master, client_master } = require('../../models');

exports.login = async ({ email, password }) => {
  const user = await user_master.findOne({
    where: { email, status: 1 },
    include: [{ model: client_master }]
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      client_id: user.client_id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      client_id: user.client_id,
      client_name: user.client_master.client_name
    }
  };
};
