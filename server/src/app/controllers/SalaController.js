const { Sala, Professor } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { page, search } = req.headers;

      const totalCount = await Sala.count({
        ...((search !== undefined && search !== '') && {
          where: {
            nome_sala: search
          }
        })
      });

      const salas = await Sala.findAll({
        ...((search !== undefined && search !== '') && {
          where: {
            nome_sala: search
          }
        }),
        ...((page !== undefined && page !== '') && {
          offset: page * 10,
          limit: 10,
        }),
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'nome_sala'],
        include: [{
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
        }],
      });

      return res.json({ totalCount, salas });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const sala = await Sala.findByPk(id, {
        attributes: ['id', 'nome_sala'],
        include: [{
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
        }],
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
      const { nome_sala, professores } = req.body;

      const sala = await Sala.create({
        nome_sala
      });

      if(professores) {
        await Promise.all(professores.map(async(professorId) => {
          const professor = await Professor.findByPk(professorId);

          await professor.setSala(sala);
        }));
      }
      
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
      const { nome_sala, professores, professoresToRemove } = req.body;

      const sala = await Sala.findByPk(id);
      
      if(!sala) {
        return res.status(404).json({ error: [{ msg: 'Sala não encontrada.' }] }); 
      }

      await sala.update({
        nome_sala
      });

      if(professores) {
        await Promise.all(professores.map(async(professorId) => {
          const professor = await Professor.findByPk(professorId);

          await professor.setSala(sala);
        }));
      }
      if(professoresToRemove) {
        await Promise.all(professoresToRemove.map(async(professorId) => {
          const professor = await Professor.findByPk(professorId);

          await professor.setSala(null);
        }));
      }

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