require('dotenv').config()
const knexPg = require('../database/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    const pessoa = await knexPg('pessoa').select('*');

    return res.status(200).json(pessoa);

  },

  async registro (req, res) {
    const { data,
      tipo, dtaAtual } = req.body;

    const verify = await knexPg('pessoa')
          .where('cpfcnpj', data.cpfcnpj)
          .select('*');

    if(verify == '') {
      const hash = await bcrypt.hash(data.password, 10);

      try {
        await knexPg('pessoa').insert({
          status: "A",
          nomerazao: data.nomerazao,
          nomefantasia: data.nomefantasia,
          fisicajuridica: tipo,
          sexo: data.sexo,
          endereco: data.endereco,
          nroendereco: data.nroendereco,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          cep: data.cep,
          foneddd: data.foneddd,
          fonenro: data.fonenro,
          cpfcnpj: data.cpfcnpj,
          email: data.email,
          senha: hash,
          dtacadastro: dtaAtual
        })
      } catch (error) {
        return res.status(400).json({error: `${error}`});
      }
      return res.status(200).json(data.nomerazao); 
    } else {
      return res.status(400).json({error: 'CPF / CNPJ já cadastrado.'});
    }
  }, 

  async login(req, res) {

    const { cpfcnpj, password } = req.body;

    const pessoaLogin = await knexPg('pessoa')
        .where({
            'cpfcnpj': cpfcnpj,
        })
        .select('*')
        .first();

    if (!pessoaLogin) {
      return res.status(400).json({ error: 'Dados incorretos, tente novamente!'});
    }

    bcrypt.compare(password, pessoaLogin.senha, (err, result) => {
      if(err) {
        return res.status(400).send(`${err}`);
      }

      if(result) {
        const token = jwt.sign({
          cpfcnpj: pessoaLogin.cpfcnpj
        }, process.env.JWT_KEY, 
        {
          expiresIn: "24h"
        })
        return res.status(200).json({id_pessoa: pessoaLogin.id_pessoa, 
          cpfcnpj: pessoaLogin.cpfcnpj, nomerazao: pessoaLogin.nomerazao, 
          fisicajuridica: pessoaLogin.fisicajuridica, token});
      }

      return res.status(400).send('Falha na autenticação');
    })
  }
}