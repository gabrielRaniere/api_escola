// eslint-disable-next-line import/no-extraneous-dependencies
import Jwt from 'jsonwebtoken';
import User from '../models/users';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json('Login required');
  const [, token] = authorization.split(' ');

  try {
    const dados = Jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;

    User.findOne({
      where: {
        id,
        email,
      },
    }).then((user) => {
      if (!user) return res.status('400').json('usuário inválido');

      req.userId = id;
      req.userEmail = email;

      return next();
    });
  } catch (e) {
    return res.status(401).json('token expirado ou invalido...');
  }
};
