const router = require('express').Router()
const {
    cadastrar_aluno,
    obter_aluno,
    obter_alunos,
    editar_aluno,
    valida_cpf,
    obter_enderecos_aluno,
    notas_criterio,
    notas_media
} = require('./aluno')
const { cadastrar_endereco, obter_enderecos } = require('./endereco')

// Alunos
router.post('/aluno', valida_cpf, cadastrar_aluno)
router.put('/aluno/:id', valida_cpf, editar_aluno)
router.get('/aluno/media', notas_media)
router.get('/aluno/:id', obter_aluno)
router.get('/aluno', obter_alunos)
router.get('/aluno/:id/endereco', obter_enderecos_aluno)
router.get('/aluno/:nota/criterio/:criterio', notas_criterio)

// Enderecos
router.post('/endereco', cadastrar_endereco)
router.get('/endereco', obter_enderecos)

module.exports = router