const knexPg = require('../database/postgres');

module.exports = {
  async indexStore(req, res) {
    let where = {}
    for (const [key, value] of Object.entries(req.query)) {
      where[key] = value
    }

    try {
      const store = await knexPg('pessoa')
      .select('id_pessoa', 'nomerazao', 'endereco', 'nroendereco', 'bairro', 'foneddd',
      'fonenro', 'email')
      .whereRaw('LOWER(cidade) LIKE ?', '%'+where.cidade.toLowerCase()+'%', 'and LOWER(uf) LIKE ?',
      '%'+where.uf.toLowerCase()+'%')
      .where('status', 'A')
      .andWhere('fisicajuridica', 'J')
      .orderBy('nomerazao')

      return res.status(200).json(store);
    } catch (error) {
      return res.status(400).json({ message: `${error}`})
    }
  },

  async storeProducts(req, res) {
    const idPessoa = req.headers.authorization;

    const verify = await knexPg('produtos')
      .where('id_pessoa', idPessoa)
      .select('nome_produto');

    if(verify.length > 0) {
      try {
        const products = await 
        knexPg('produtos')
        .select('*')
        .where('id_pessoa', idPessoa)
        .andWhere('status_produto', 'A')
        .orderBy('nome_produto')
  
        return res.status(200).json(products)
      } catch (error) {
        return res.status(400).json({ error: `${error}`})
      }
    } else {
      return res.status(400).json({ error: 'Não há produtos cadastrados nesta empresa...' });
    }
  }
}