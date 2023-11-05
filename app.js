import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import { resolve } from 'path';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './src/routes/home';
import usersRoutes from './src/routes/usersRoutes';
import tokenRouter from './src/routes/tokens';
import alunoRouter from './src/routes/alunosRoutes';
import loginRequired from './src/midlewares/loginRequired';
import picturesRouter from './src/routes/picturesRoutes';

const whiteList = [
  'http://192.168.56.1:3000/',
  'http://localhost:3000',
];

const corsOrigin = {
  origin: (origin, cb) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('not allowed by CORS'));
    }
  },
};

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
    this.app.use(helmet());
    this.app.use(cors(corsOrigin));
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
