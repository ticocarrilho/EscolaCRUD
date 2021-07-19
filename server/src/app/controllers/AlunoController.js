const { Op } = require('sequelize');
const { Aluno, Sala, Professor } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { page, search } = req.headers;

      const totalCount = await Aluno.count({
        ...((search !== undefined && search !== '') && {
          where: {
            nome: {
              [Op.iLike]: `%${search}%`
            }
          }
        })
      });

      const alunos = await Aluno.findAll({
        ...((search !== undefined && search !== '') && {
          where: {
            nome: {
              [Op.iLike]: `%${search}%`
            }
          }
        }),
        ...((page !== undefined && page !== '') && {
          offset: page * 10,
          limit: 10,
        }),
        order: [
          ['id', 'ASC'],
        ],
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
      
      return res.json({ totalCount, alunos });
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
      const { nome, professor } = req.body;

      if(professor !== undefined && professor !== '') {
        const findProfessor = await Professor.findByPk(professor);
        
        if(!findProfessor) {
          return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
        }
      }

      const aluno = await Aluno.create({
        nome,
        ...((professor !== undefined && professor !== '') && {
          id_professor: professor
        })
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
      const { nome, professor } = req.body;

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

      if(professor !== undefined && professor !== '') {
        const findProfessor = await Professor.findByPk(professor);
        
        if(!findProfessor) {
          return res.status(404).json({ error: [{ msg: 'Professor não encontrado.' }] }); 
        }
      }

      await aluno.update({
        nome,
        ...((professor !== undefined && professor !== '') && {
          id_professor: professor
        })
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