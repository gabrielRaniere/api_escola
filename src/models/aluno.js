import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 15],
            msg: 'nome deve conter entre 3 a 15 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 15],
            msg: 'sobrenome deve conter entre 3 a 15 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'email já existente !',
        },
        validate: {
          isEmail: {
            msg: 'formato de email invalido !',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'altura requerida em metros...',
          },
          len: {
            args: [1, 4],
            msg: 'campo altura deve conter entre 1 a 3 caracteres...',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'altura requerida em metros...',
          },
          len: {
            args: [1, 4],
            msg: 'campo altura deve conter entre 1 a 3 caracteres...',
          },
        },
      },
    }, {
      // conexão
      sequelize,
    });

    return this;
  }

  static associate(model) {
    this.hasMany(model.Picture, { foreignKey: 'aluno_id' });
  }
}
