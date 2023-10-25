import Aluno from '../models/aluno';
import Picture from '../models/pictures';
// import Pictures from '../models/pictures';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll(
        {
          attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'altura', 'peso'],
          order: [['id', 'DESC'], [Picture, 'created_at', 'DESC']],
          include: {
            model: Picture,
            attributes: ['filename', 'aluno_id', 'url'],
          },
        },
      );

      alunos.forEach((aluno) => {
        aluno.fotos = [1, 2, 3, 4];
      });

      res.json(alunos);
    } catch (e) {
      res.status(400).json('deu merda...');
    }
  }

  async create(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      res.json(aluno);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map(((msg) => msg.message)),
      });
    }
  }

  async update(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(404).json('aluno não encontrado...');
      }

      const updatedAluno = await aluno.update(req.body);

      return res.json(updatedAluno);
    } catch (e) {
      return res.status(400).json(e.errors.map(((msg) => msg.message)));
    }
  }

  async delete(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(404).json('aluno não encontrado...');
      }

      await aluno.destroy();

      return res.json('classmatter removed sucessfully');
    } catch (e) {
      return res.status(400).json('something went wrongg..');
    }
  }

  async show(req, res) {
    try {
      const aluno = await Aluno.findOne(
        {
          where: req.body,
          attributes: ['id', 'nome', 'sobrenome'],
          order: [[Picture, 'created_at', 'DESC']],
          include: {
            model: Picture,
            attributes: ['filename', 'aluno_id', 'id'],
          },
        },
      );

      if (!aluno) {
        return res.json('aluno não encontrado...');
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json('algo deu errado...');
    }
  }
}

export default new AlunoController();
