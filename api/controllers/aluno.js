const db = require('../../db')
const validarCpf = require('../lib/validar-cpf')
const parseCpfIn = require('../lib/parse-cpf-in')
const parseCpfOut = require('../lib/parse-cpf-out')
module.exports = {
	cadastrar_aluno: cadastrarAluno,
	editar_aluno: editarAluno,
	obter_aluno: obterAluno,
	obter_alunos: obterAlunos,
	obter_enderecos_aluno: obterEnderecosAluno,
	valida_cpf,
	notas_criterio: notasCriterio,
	notas_media: notasMedia
};

async function valida_cpf(req, res, next) {
	try {
		let cpfNum = parseCpfIn(req.body.cpf)
		if (!cpfNum) return res.status(400).json({"error":{"message":"CPF Inválido."}})
		let cpfDuplicado = await db.Aluno.findOne({ where: { cpf: cpfNum } })
		if (cpfDuplicado) return res.status(400).json({"error":{"message":"CPF cadastrado já existe no banco."}})
		let cpf_valido = validarCpf(cpfNum)
		if (!cpf_valido) {
			return res.status(400).json({"error":{"message":"CPF Inválido."}})
		}
		return next()
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}

async function cadastrarAluno(req, res) {
	let aluno = {
		"nome": req.body.nome,
		"data_nascimento": req.body.data_nascimento,
		"cpf": parseCpfIn(req.body.cpf),
		"nota": req.body.nota
	}
	try {
		const alunoCreated = await db.Aluno.create(aluno)
		return res.status(201).json(alunoCreated)
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}

async function editarAluno(req, res) {
	let updates = {
		"nome": req.body.nome,
		"data_nascimento": req.body.data_nascimento,
		"cpf": req.body.cpf,
		"nota": req.body.nota
	}
	try {
		const aluno = await db.Aluno.findByPk(req.params.id)
		if (!aluno) return res.sendStatus(404)
		const updated = await aluno.update(updates)
		return res.status(200).json(updated)
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}

async function obterAluno(req, res) {
	try {
		let aluno = await db.Aluno.findByPk(req.params.id)
		if (!aluno) return res.sendStatus(404)
		aluno = parseCpfOut(aluno)
		return res.status(200).json(aluno)
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}

async function obterAlunos(req, res) {
	try {
		const alunos = await db.Aluno.findAll()
		return res.status(200).json(alunos.map(parseCpfOut))
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}

async function obterEnderecosAluno(req, res) {
	try {
		const aluno = await db.Aluno.findByPk(req.params.id, {
			include: {
				model: db.Endereco
			}
		})
		let result = {
			total: aluno.Enderecos.length,
			enderecos: aluno.Enderecos
		}
		return res.status(200).json(result)
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}

async function notasCriterio(req, res) {
	try {
		let where = {}
		let nota = parseFloat(req.params.nota)
		const Op = db.Sequelize.Op

		switch (req.params.criterio) {
			case '>':
				where['nota'] = { [Op.gt]: nota }
				break
			case '<':
				where['nota'] = { [Op.lt]: nota }
				break
			default:
				return res.sendStatus(400)
		}
		const alunos = await db.Aluno.findAll({ where })
		return res.status(200).json(alunos.map(parseCpfOut))
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)

	}
}
async function notasMedia(req, res) {
	try {
		const Op = db.Sequelize.Op
		const alunos = await db.Aluno.findAll()
		let notas = alunos.map((aluno) => {
			return aluno.nota
		})
		let soma = notas.reduce((sum, nota) => {
			return sum + nota;
		})
		let media = soma / notas.length
		let alunosFiltrados = alunos.filter((aluno) => { return aluno.nota > media })
		return res.status(200).json(alunosFiltrados.map(parseCpfOut))
	} catch (err) {
		console.error(err)
		return res.sendStatus(500)
	}
}