import { Router } from 'express';

const agendamentosRouter = Router();

agendamentosRouter.post('/', (request, response) => {
    return response.json({ message: 'Agendamentos' });
});

export default agendamentosRouter;
