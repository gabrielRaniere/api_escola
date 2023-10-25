// import Aluno from '../models/aluno';
import User from '../models/users';

class HomeController {
  async index(req, res) {
    const novoUser = await User.create({
      nome: 'Marta',
      email: 'angelxk09@gmail.com',
      password: '12312390',
    });

    res.json(novoUser);
  }
}

export default new HomeController();
