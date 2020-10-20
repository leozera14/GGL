const knexPg = require('../database/postgres');

module.exports = {
  async Products(req, res) {
    let where = {}
    for (const [key, value] of Object.entries(req.query)) {
      where[key] = value
    }

    try {
      const data = await 
      knexPg('produtos')
      .select('*')
      .where(where)
      .orderBy('nome_produto')

      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({ message: `${error}`})
    }
  },


  async newProducts(req, res) {
    const data = req.body;
    const idPessoa = req.headers.authorization;

    const verify = await knexPg('produtos')
        .whereRaw('LOWER(nome_produto) LIKE ?', '%'+data.nome_produto.toLowerCase()+'%');

    if(verify == '') {
      try {
        await knexPg('produtos').insert({
          id_pessoa: idPessoa,
          nome_produto: data.nome_produto,
          imagem_produto: "",
          descricao_produto: data.descricao_produto,
          quantidade_produto: data.quantidade_produto || 0,
          preco_produto: data.preco_produto,
          status_produto: "A"
        })
        return res.status(200).json({ message: `${data.nome_produto} foi cadastrado com sucesso !`}); 
      } catch (error) {
        return res.status(400).json({error: `${error}`});
      }    
    } else {
      return res.status(400).json({error: 'Produto já cadastrado na Loja.'})
    } 
  }, 

  async deleteProduct(req, res) {
    let where = {}
    for (const [key, value] of Object.entries(req.query)) {
      where[key] = value
    }

    const idPessoa = req.headers.authorization;
    const id_produto = req.headers.produto;

    const verify = await knexPg('produtos')
      .select('nome_produto')
      .where('id_pessoa', idPessoa)
      .andWhere('id_produto', id_produto)

    if(verify == '') {
      return res.status(400).json({error: 'Produto não cadastrado para esta empresa.'})
    } else {
      await knexPg('produtos').delete()
      .where(where)
      .select('*')
      return res.status(200).json(verify);
    }
  },

  async editProducts(req, res) {
    let where = {}
    for (const [key, value] of Object.entries(req.query)) {
      where[key] = value
    }

    const data = req.body;
    const id_produto = req.query.id_produto;
    const idPessoa = req.headers.authorization;
    
    const verify = await knexPg('produtos')
      .select('nome_produto')
      .where('id_pessoa', idPessoa)
      .andWhere('id_produto', id_produto)
      

    if(verify.length >= 0) {
      try {
        await knexPg('produtos').update({
          nome_produto: data.nome_produto,
          imagem_produto: "",
          descricao_produto: data.descricao_produto,
          quantidade_produto: data.quantidade_produto || 0,
          preco_produto: data.preco_produto,
          status_produto: data.status_produto
        })
        .where(where)
        .select('*')

        return res.status(200).json({message: `Produto ${data.nome_produto} alterado com sucesso !`});
      } catch (error) {
        console.log(`${error}`)
      }
    } else {
      return res.status(400).json({error: 'Produto não encontrado ou não cadastrado nesta empresa.'})
    }
  }
 }
