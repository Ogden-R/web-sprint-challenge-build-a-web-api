// add middlewares here related to projects

const Projects = require('./projects-model.js')

function validateProjectId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
    .then((project) =>{
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({
                message: 'Project not found'
            })
        }
    })
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description || !name.trim()) {
        res.status(400).json({
            message: 'Missing required name or description field'
        })
    } else {
        next()
    }
}

function validateProjectComplete(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || !name.trim() || completed == undefined) {
        res.status(400).json({
            message: `Missing required name, description or 'completed' field`
        })
    } else {
        next()
    }
}

module.exports = {validateProjectId, validateProject, validateProjectComplete}