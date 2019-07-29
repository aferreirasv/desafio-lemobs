module.exports = (sequelize,DataTypes)=>{
    const Endereco = sequelize.define('Endereco',{
        rua:{
            type: DataTypes.STRING,
            allowNull: false
        },
        numero:{
            type: DataTypes.STRING,
            allowNull: true
        },
        complemento:{
            type: DataTypes.STRING,
            allowNull: true
        },
        bairro:{
            type: DataTypes.STRING,
            allowNull: false
        },
        aluno_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        tableName: 'enderecos',
        paranoid: false,
        timestamps: false
    })
    Endereco.associate = function(models){
        Endereco.belongsTo(models.Aluno,{foreignKey:'aluno_id'})
    }
    return Endereco
}