// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import User from '../models/users';

export default class tokenController {
  static async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) return res.status(401).json('credenciais invalidas!');

      const user = await User.findOne({ where: { email } });

      const passwordTrue = await user.passwordTrue(password);

      if (user && passwordTrue) {
        console.log(user);

        const { id } = user;
        const tokenJwt = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({
          token: tokenJwt,
        });
      }

      return res.status(401).json('usuário não encontrado...');
    } catch (e) {
      console.log(e);
      return res.status(400).json('something went wrong...');
    }
  }
}
