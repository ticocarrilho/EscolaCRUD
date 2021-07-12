
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define(
    'Sala',
  {
    nome_sala: DataTypes.STRING(150)
  });

  Sala.associate = function (models) {
    Sala.hasMany(models.Professor, { foreignKey: 'id_sala', as: 'professor' });
  };

  return Sala;
};
