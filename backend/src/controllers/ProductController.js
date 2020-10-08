const knexPg = require('../database/postgres');

module.exports = {
  async newProducts(req, res) {
    const { idPessoa, data } = req.body;

    console.log(req.body);

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
  } 
 }