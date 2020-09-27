import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

// sobre a classe vem sempre o @Entity('') com o nome da tabela
@Entity('agendamentos')
class Agendamentos {
    // tipo uuid: o tipo que definimos para a id na nossa migration
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // quando não especificamos um tipo para uma coluna, vai ser sempre varchar (= string), que é o padrão
    // como nome foi definido como varchar no nosso banco, podemos deixar em branco aqui
    @Column()
    prestador_servico_id: string;

    @Column('timestamp without time zone')
    data: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Agendamentos;
