import { Router } from 'express';
// já que vamos recuperar os registros, teremos de usar o método find,
// que pertence ao getRepository do typeorm
import { getRepository } from 'typeorm';

import UsuariosController from '../app/controllers/UsuariosController';
// já que vamos acessar a tabela, que é representada pelo model, temos de importar o model
import Usuarios from '../app/models/Usuarios';

const usuariosRouter = Router();

// vamos criar a primeira rota com o método post, que vai ter como objetivo gravar um usuário
// nesse caso colocamos apenas a '/', porque o '/usuarios' já está na rota do index.ts
usuariosRouter.post('/', async (request, response) => {
    try {
        // >código para verificação< caso tudo dê certo, retornamos um json com ok e uma mensagem
        // return response.json({ ok: 'rota de usuários' });
        // código 'oficial'
        // começamos por fazer uma desestruturação da requisição, de onde vêm o nome, email e senha
        const { nome, email, password } = request.body;

        // vamos instanciar a classe usuariosController, para chamar o método store dela
        const usuariosController = new UsuariosController();

        // criar um objeto
        // com o typescript, basta dar ctrl + space quando vc não se lembrar quais são os parâmetros
        // que a função espera receber.
        const user = await usuariosController.store({
            nome,
            email,
            password,
        });
        // não tá deletando a senha
        delete user.password;

        return response.json(user);
    } catch (erro) {
        // o parâmetro do catch é uma variável que é retornada quando dá um erro (do throw new Error, no controller?),
        // aqui chamamos de erro
        // agora aqui abaixo, retornamos dentro de um json a mensagem dessa variável (erro.message)
        // junto com o status 400, que representa um erro
        return response.status(400).json({ error: erro.message });
    }
});

// listar todos os usuários
usuariosRouter.get('/', async (request, response) => {
    // vamos atribuir o getRepository passando o model de Usuarios ao usuariosRepositorio
    const usuariosRepositorio = getRepository(Usuarios);
    // declarar um objeto para receber a busca feita com o método .find();
    const user = await usuariosRepositorio.find();
    delete user[0].password;
    return response.json(user);
});

// listar um único usuário
usuariosRouter.get('/:id', async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    const user = await usuariosRepositorio.findOne(id);
    return response.json(user);
});

// excluir um usuário
usuariosRouter.delete('/:id', async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    await usuariosRepositorio.delete(id);
    return response.send();
});

export default usuariosRouter;
