const db = require('../../db')

module.exports = {
    cadastrar_endereco: cadastrarEndereco,
    obter_enderecos: obterEnderecos,
}

async function cadastrarEndereco(req, res) {
    let endereco = {
        'rua': req.body.rua,
        'numero': req.body.numero,
        'complemento': req.body.complemento,
        'bairro': req.body.bairro,
        'aluno_id': req.body.aluno_id
    }
    try {
        const enderecoCreated = await db.Endereco.create(endereco)
        return res.status(201).json(enderecoCreated)
    } catch (err) {
        console.error(err)
        return res.status(500)
    }
}

async function obterEnderecos(req, res) {
    try {
        let enderecos
        if (req.query.bairro) {
            enderecos = await db.Endereco.findAll({
                where: { bairro: req.query.bairro }
            })
        } else {
            enderecos = await db.Endereco.findAll()
        }
        return res.status(200).json(enderecos)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}