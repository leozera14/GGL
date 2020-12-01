const knexPg = require('../database/postgres');
const Notification = require('../schemas/Notification');
const nodemailer = require("nodemailer");
const mailConfig = require('../mail');
const { sendEmail } = require('../lib/Mail');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    
    const { id_cliente, id_loja } = req.body;

    // REQ PARA CLIENTES//
    if(!id_loja) {
      const verify = await knexPg('pessoa')
        .where('id_pessoa', id_cliente)
        .andWhere('fisicajuridica', 'F')

      if (verify.length > 0) {
        
        const agenda = await knexPg('agendamentos')
        .join('pessoa', 'agendamentos.id_loja', 'pessoa.id_pessoa')
        .where('id_cliente', id_cliente)
        .andWhere('data_cancelamento', null)
        .orderBy('data_agendamento')
        .limit(20)
        .offset((page - 1) * 20)
        .select(
          'agendamentos.id_agendamento', 'agendamentos.data_agendamento',
          'agendamentos.id_loja', 'pessoa.nomerazao', 'pessoa.endereco',
          'pessoa.nroendereco', 'pessoa.bairro' ,'pessoa.cidade', 'pessoa.uf',
          'pessoa.foneddd', 'pessoa.fonenro', 'pessoa.imagem_pessoa'
        )

        if(agenda.length <= 0) {
          return res.status(200).json({ message: "Cliente sem nenhum agendamento ainda... "});
        }

        const agenda_cliente = agenda.map(agenda => {
          return {
            id_agendamento: agenda.id_agendamento,
            data_agendamento: new Date(agenda.data_agendamento).toLocaleString('pt-br', {
              timeZone: 'America/Sao_Paulo',
            }),
            loja: {
              id: agenda.id_loja,
              nome: agenda.nomerazao,
              endereco: agenda.endereco + agenda.nroendereco,
              bairro: agenda.bairro,
              cidade: agenda.cidade + "-" + agenda.uf,
              contato: "(" + agenda.foneddd + ")" + agenda.fonenro,
              avatar: agenda.imagem_pessoa
            }
          }
        })

        return res.status(200).json(agenda_cliente);
      } else {
        return res.status(401).json({ error: 'Requisição permitida apenas para clientes !' });
      }

      // REQ PARA LOJAS //
    } else {

      const verify = await knexPg('pessoa')
        .where('id_pessoa', id_loja)
        .andWhere('fisicajuridica', 'J')
      
      if(verify.length > 0) {
        const agenda = await knexPg('agendamentos')
        .join('pessoa', 'agendamentos.id_cliente', 'pessoa.id_pessoa')
        .where('id_loja', id_loja)
        .andWhere('data_cancelamento', null)
        .orderBy('data_agendamento')
        .limit(20)
        .offset((page - 1) * 20)
        .select(
          'agendamentos.id_agendamento', 'agendamentos.data_agendamento',
          'agendamentos.id_cliente', 'pessoa.nomerazao', 'pessoa.foneddd', 
          'pessoa.fonenro', 'pessoa.imagem_pessoa'
        )

        if(agenda.length <= 0) {
          return res.status(400).json({ message: "Loja sem nenhum agendamento ainda... "});
        }

        const agenda_loja = agenda.map(agenda => {
          return {
            id_agendamento: agenda.id_agendamento,
            data_agendamento: new Date(agenda.data_agendamento).toLocaleString('pt-br', {
              timeZone: 'America/Sao_Paulo',
            }),
            cliente: {
              id: agenda.id_cliente,
              nome: agenda.nomerazao,
              contato: "(" + agenda.foneddd + ")" + agenda.fonenro,
              avatar: agenda.imagem_pessoa
            }
          }
        })

        return res.status(200).json(agenda_loja);
      } else {
        return res.status(401).json({ error: 'Requisição permitida apenas para lojas !' });
      }
    }
  },


  async store(req, res) {
    const data = req.body;

    const dateNow = new Date().toLocaleString('pt-br', {
      timeZone: 'America/Sao_Paulo',
    });

    const verifyStore = await knexPg('pessoa')
      .where('id_pessoa', data.id_loja)
      .andWhere('fisicajuridica', 'J')

    const verifyDate = await knexPg('agendamentos')
      .where('id_loja', data.id_loja)
      .andWhere('data_agendamento', data.data_agendamento)

    const cliente = await knexPg('pessoa')
    .where('id_pessoa', data.id_cliente)
    .andWhere('fisicajuridica', 'F')

    if(verifyDate.length > 0) {
      return res.status(400).json({ error: "Horário já agendado" })
    }

    if(verifyStore.length > 0 && verifyDate.length !== 1) {
        await knexPg('agendamentos').insert({
        data_agendamento: data.data_agendamento,
        id_cliente: data.id_cliente,
        id_loja: data.id_loja,
        data_cancelamento: data.data_cancelamento || null,
        created_at: dateNow
      }),

      // Notificações para a Loja
      await Notification.create({
        content: `Novo agendamento de ${cliente[0].nomerazao} para a data ${data.data_agendamento}`,
        user: data.id_loja, 
      });


      return res.status(200).json({ message: "Agendamento feito com sucesso !" });
    } else {
      return res.status(401).json({ error: "Só se pode criar agendamentos para Lojas !" });
    }
  },

  async delete(req, res) {
    const { id_agendamento, id_cliente } = req.body

    const { host, port, secure, auth } = mailConfig;

    const agendamento = await knexPg('agendamentos')
      .where('id_agendamento', id_agendamento)
      .andWhere('id_cliente', id_cliente)

    const loja = await knexPg('agendamentos')
        .join('pessoa', 'agendamentos.id_loja', 'pessoa.id_pessoa')
        .where('id_loja', agendamento[0].id_loja)
        .select(
          'pessoa.email', 'agendamentos.data_agendamento',
          'pessoa.nomerazao',
        )

    let transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })
  
    let info = await transporter.sendMail({
      from: '"GGL <noreply@ggl.com>', // sender address
      to: `${loja[0].nomerazao} <${loja[0].email}>`,
      subject: `Agendamento ${agendamento[0].id_agendamento} cancelado`,
      text: `O agendamento das ${loja[0].data_agendamento} foi cancelado!`,
    });
    
    
    return res.status(200).json({ message: "Agendamento excluido com sucesso !"});
  }
}