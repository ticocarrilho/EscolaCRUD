const { Aluno, Sala, Professor } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome'],
        include: [{
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
          include: [{
            model: Sala,
            as: 'sala',
            attributes: ['id', 'nome_sala']
          }]
        }]
      });
      
      return res.json(alunos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome'],
        include: [{
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
          include: [{
            model: Sala,
            as: 'sala',
            attributes: ['id', 'nome_sala']
          }]
        }]
      });
      
      if(!aluno) {
        return res.status(404).json({ error: [{ msg: 'Aluno não encontrado.' }] }); 
      }

      return res.json(aluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { nome, id_professor } = req.body;

      if(id_professor !== undefined) {
        const professor = await Professor.findByPk(id_professor);
        
        if(!professor) {
          return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
        }
      }

      const aluno = await Aluno.create({
        nome,
        id_professor
      });
      
      aluno.professor = await aluno.getProfessor();

      return res.json({
        id: aluno.id,
        nome: aluno.nome,
        professor: aluno.professor
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_professor } = req.body;

      const aluno = await Aluno.findByPk(id, {
        include: [{
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
          include: [{
            model: Sala,
            as: 'sala',
            attributes: ['id', 'nome_sala']
          }]
        }]
      });
      
      if(!aluno) {
        return res.status(404).json({ error: [{ msg: 'Aluno não encontrado.' }] }); 
      }

      if(id_professor !== undefined) {
        const professor = await Professor.findByPk(id_professor);
        
        if(!professor) {
          return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
        }
      }

      await aluno.update({
        nome,
        id_professor
      });

      await aluno.reload();

      return res.json({
        id: aluno.id,
        nome: aluno.nome,
        professor: aluno.professor
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);
      
      if(!aluno) {
        return res.status(404).json({ error: [{ msg: 'Aluno não encontrado.' }] }); 
      }

      await aluno.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};