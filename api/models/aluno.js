
module.exports = (sequelize, DataTypes) => {
	const Aluno = sequelize.define('Aluno', {
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		data_nascimento: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nota: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	}, {
			tableName: 'alunos',
			paranoid: false,
			timestamps: false
		})

	Aluno.associate = function (models) {
		Aluno.hasMany(models.Endereco,{foreignKey:'aluno_id'})
	}

	return Aluno
}