import { getRepository } from 'typeorm';
import Agendamentos from '../models/Agendamentos';

interface Request {
    prestador_servico_id: string;
    data: Date;
}

class AgendamentosController {
    public async store({ prestador_servico_id, data }: Request): Promise<Agendamentos> {
        const agendamentosRepository = getRepository(Agendamentos);
        const agendamento = agendamentosRepository.create({
            prestador_servico_id,
            data,
        });
        await agendamentosRepository.save(agendamento);
        return agendamento;
    }
}

export default AgendamentosController;
