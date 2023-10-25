import multer from 'multer';

import multerConfig from '../config/multer';

import Picture from '../models/pictures';

import User from '../models/users';

const upload = multer(multerConfig).single('arquivo');

class PictureController {
  store(req, res) {
    // eslint-disable-next-line consistent-return
    return upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({
            errors: err.code,
          });
        }

        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        await Picture.create({ originalname, filename, aluno_id });

        return res.json({ originalname, filename, aluno_id });
      } catch (e) {
        const aluno = await User.findByPk(req.body.aluno_id);

        if (!aluno) {
          return res.status(400).json({
            errors: 'usuário não encontrado...',
          });
        }

        return res.status(400).json('algo deu errado...');
      }
    });
  }
}

export default new PictureController();
