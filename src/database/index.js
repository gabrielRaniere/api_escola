import Sequelize from 'sequelize';

// conexão com a base de dados
import databaseConfig from '../config/database';

// models
import Aluno from '../models/aluno';
import User from '../models/users';
import Picture from '../models/pictures';

const models = [Aluno, User, Picture];
const conection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(conection));
models.forEach((model) => model.associate && model.associate(conection.models));
