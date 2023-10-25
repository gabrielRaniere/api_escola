import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import { resolve } from 'path';

import express from 'express';
import homeRoutes from './src/routes/home';
import usersRoutes from './src/routes/usersRoutes';
import tokenRouter from './src/routes/tokens';
import alunoRouter from './src/routes/alunosRoutes';
import loginRequired from './src/midlewares/loginRequired';
import picturesRouter from './src/routes/picturesRoutes';

class App {
  constructor() {
    this.app = express();
    this.midlewares();
    this.routes();
  }

  midlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', usersRoutes);
    this.app.use('/tokens/', tokenRouter);

    // rotas - Jwt NECESSaRY
    this.app.use(loginRequired);
    this.app.use('/pictures/', picturesRouter);
    this.app.use('/alunos/', alunoRouter);
  }
}

export default new App().app;

