// add middlewares here related to actions
const Actions = require ('./actions-model')

function validateActionsId(req, res, next) {
    const { id } = req.params
    Actions.get(id)
    .then((actions) =>{
        if(actions) {
            req.actions = actions
            next()
        } else {
            res.status(404).json({
                message: 'actions not found'
            })
        }
    })
}

function validateActions(req, res, next) {
    const { 
        project_id, 
        description, 
        notes, 
        completed
    } = req.body
    if (
        !project_id == undefined || 
        !description || 
        !notes ||
        !completed == undefined
    ) {
        res.status(400).json({
            message: `missing Project_id, description, notes, or 'completed' field`
        })
    } else {
        next()
    }
}

module.exports = { validateActionsId, validateActions }
