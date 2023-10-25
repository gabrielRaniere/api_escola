import UserModel from '../models/users';

export default class Controller {
  static async store(req, res) {
    try {
      const usuario = await UserModel.create(req.body);

      res.json(usuario);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        erros: e.errors.map((erro) => erro.message),
      });
    }
  }

  static async index(req, res) {
    try {
      console.log(req.userId, req.userEmail);
      const users = await UserModel.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(404).json(null);
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      // pk -> primary key == identifyer
      const user = await UserModel.findByPk(id);

      if (!user) {
        res.json('usuário não encontrado');
        return;
      }

      const { idUser, nome, email } = user;

      res.json({ idUser, nome, email });
    } catch (e) {
      res.status(404).json(null);
    }
  }

  static async update(req, res) {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        return res.json({
          erro: 'user não encontrado',
        });
      }

      if (req.body.password_hash) {
        return res.status(400).json('senha não pode ser mudada');
      }

      const userUpdated = await user.update(req.body);

      const { id, nome, email } = userUpdated;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        erros: e.errors.map((erro) => erro.message),
      });
    }
  }

  static async delete(req, res) {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        res.json({
          error: 'usuário inexistente',
        });
        return;
      }

      await user.destroy(user);

      res.json(user);
    } catch (e) {
      res.status(400).json('cuacua');
    }
  }
}
