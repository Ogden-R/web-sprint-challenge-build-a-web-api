// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

const {
    validateProjectId,
    validateProject,
    validateProjectComplete
} = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then((newProject) => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProjectComplete, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.project)
    })
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) =>{
    Projects.getProjectActions(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

module.exports = router