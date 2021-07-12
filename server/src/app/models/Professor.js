
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define(
    'Professor',
  {
    nome: DataTypes.STRING(150)
  }, {
    tableName: 'professores'
  });

  Professor.associate = function (models) {
    Professor.hasMany(models.Aluno, { foreignKey: 'id_professor', as: 'aluno' });
    Professor.belongsTo(models.Sala, { foreignKey: 'id_sala', as: 'sala' });
  };

  return Professor;
};
