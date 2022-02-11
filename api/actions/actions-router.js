
// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const {
    validateActionsId,
    validateActions
} = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Actions.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.actions)
})

router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
    .then((actionNew) => {
        res.status(201).json(actionNew)
    })
    .catch(next)
})

router.put('/:id', validateActionsId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(editedAction => {
        res.status(200).json(editedAction)
    })
    .catch(next)
})

router.delete('/:id', validateActionsId, (req, res, next) => {
    Actions.get(req.params.id)
    .then((removeAction) => {
        Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(removeAction)
        })
    })
    .catch(next)
})

module.exports = router