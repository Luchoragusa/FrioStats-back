const { User } = require('../database/models/index')
const sequelize = require('sequelize');

const index = async (req,res) => {
    let usuario = await User.findAll()
    return res.render('../src/views/usuario/index', {usuario});
};

const show = async (req,res) => {
    const id = req.params.id
    let elemento = await User.findOne({ where: { id: id } });
    return res.render('../src/views/usuario/show', {elemento});
};

const edit = async (req,res) => {
    const id = req.params.id
    let elemento = await User.findOne({ where: { id: id } });
    return res.render('../src/views/usuario/edit', {elemento});
};

const create = async (req,res) => {
    return res.render('../src/views/usuario/create');
};

//API

const store = async (req,res) => {
    const params = req.body;
    let user = await User.create(params)
    if (user) {
        return res.status(200).json({'status':200, user, 'msg':'Creado correctamente'})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
};

const update = async (req,res) => {
    const params = req.body;
    const id = req.params.id;
    let user = await User.findByPk(id);
    if (id) {
        user.save().then(user => {
          res.status(201).json({status:201,user, 'msg':'Editado correctamente'})
        })
    } else {
        return res.status(404).json({msg:"Usuario no encontrado"})
    }
};

const destroy = async (req,res) => {
    const id = req.params.id;
    let user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({msg:"Usuario no encontrado"})
    } else {
        user.destroy().then(user => {
          res.status(200).json({status:200,user})
        })
    }
    return res.status(200).json({'status':200,eliminado, 'msg':'Eliminado correctamente'})
};

const policy = async (req, res, next) => {
    let user = await User.findOne({ where: { id: req.params.id } });
    if (user.role == 'admin'){
      req.isAdmin = true;
      next()
    } else {
      res.status(401).json({msg:"No autorizado"})
    }
  };

module.exports = {
    index,
    create,
    show,
    edit,
    store,
    destroy,
    update,
    policy
};