const knexPg = require('../database/postgres');
const Notification = require('../schemas/Notification');

module.exports = {
  async index(req, res) {
    const { id_cliente, id_loja } = req.body;

    // REQ PARA CLIENTES //

    if(!id_loja) {
      const verify = await knexPg('pessoa')
      .where('id_pessoa', id_cliente)
      .andWhere('fisicajuridica', 'F')

      if(verify.length > 0) {
        const notifications = await Notification.find({
          user: id_cliente,
        })
        .sort({ createdAt: 'desc' })
        .limit(20)

        return res.status(200).json(notifications)
      }else {
        return res.status(401).json({ error: 'Apenas clientes podem acessar' })
      }

    // REQ PARA LOJAS //
    } else {

      const verify = await knexPg('pessoa')
      .where('id_pessoa', id_loja)
      .andWhere('fisicajuridica', 'J')

      if(verify.length > 0) {
        const notifications = await Notification.find({
          user: id_loja,
        })
        .sort({ createdAt: 'desc' })
        .limit(20)

        return res.status(200).json(notifications)
      }else {
        return res.status(401).json({ error: 'Apenas lojas podem acessar' })
      }
    }
  },

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.status(200).json(notification);
  }
}