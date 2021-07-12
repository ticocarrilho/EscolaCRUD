
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define(
    'Aluno',
  {
    nome: DataTypes.STRING(150)
  });

  Aluno.associate = function (models) {
    Aluno.belongsTo(models.Professor, { foreignKey: 'id_professor', as: 'professor' });
  };

  return Aluno;
};
