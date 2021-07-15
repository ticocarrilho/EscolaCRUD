const { Sala } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const salas = await Sala.findAll({
        attributes: ['id', 'nome_sala']
      });
      
      return res.json(salas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const sala = await Sala.findByPk(id, {
        attributes: ['id', 'nome_sala']
      });
      
      if(!sala) {
        return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
      }

      return res.json(sala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome_sala } = req.body;

      const sala = await Sala.create({
        nome_sala
      });
      
      return res.json({
        id: sala.id,
        nome_sala: sala.nome_sala
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome_sala } = req.body;

      const sala = await Sala.findByPk(id);
      
      if(!sala) {
        return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
      }

      await sala.update({
        nome_sala
      });

      return res.json({
        id: sala.id,
        nome_sala: sala.nome_sala
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const sala = await Sala.findByPk(id);
      
      if(!sala) {
        return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
      }

      await sala.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};