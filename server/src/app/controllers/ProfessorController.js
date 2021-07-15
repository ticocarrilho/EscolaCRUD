const { Sala, Professor } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const professores = await Professor.findAll({
        attributes: ['id', 'nome'],
        include: [{
          model: Sala,
          as: 'sala',
          attributes: ['id', 'nome_sala']
        }]
      });
      
      return res.json(professores);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const professor = await Professor.findByPk(id, {
        attributes: ['id', 'nome'],
        include: [{
          model: Sala,
          as: 'sala',
          attributes: ['id', 'nome_sala']
        }]
      });
      
      if(!professor) {
        return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
      }

      return res.json(professor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome, id_sala } = req.body;

      if(id_sala !== undefined) {
        const sala = await Sala.findByPk(id_sala);
        
        if(!sala) {
          return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
        }
      }

      const professor = await Professor.create({
        nome,
        id_sala
      });
      
      professor.sala = await professor.getSala();

      return res.json({
        id: professor.id,
        nome: professor.nome,
        sala: professor.sala
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_sala } = req.body;

      const professor = await Professor.findByPk(id, {
        include: [{
          model: Sala,
          as: 'sala',
          attributes: ['id', 'nome_sala']
        }]
      });
      
      if(!professor) {
        return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
      }

      if(id_sala !== undefined) {
        const sala = await Sala.findByPk(id_sala);
        
        if(!sala) {
          return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
        }
      }

      await professor.update({
        nome,
        id_sala
      });

      await professor.reload();

      return res.json({
        id: professor.id,
        nome: professor.nome,
        sala: professor.sala
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const professor = await Professor.findByPk(id);
      
      if(!professor) {
        return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
      }

      await professor.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};