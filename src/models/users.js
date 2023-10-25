import Sequelize, { Model } from 'sequelize';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 12],
            msg: 'nome deve conter entre 5 a 12 caracteres...',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'email já cadastrado em nosso sistema...',
        },
        validate: {
          isEmail: {
            msg: 'formato de email invalido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 18],
            msg: 'senha deve conter entre 6 a 18 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  async passwordTrue(pass) {
    const compare = await bcrypt.compare(pass, this.password_hash);

    return compare;
  }
}
