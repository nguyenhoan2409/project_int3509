
module.exports = function (router) {

    var scoreController = require('../controllers/score.controller')

    router.post('/importStudentList', scoreController.importStudentList)
    router.put('/importScore', scoreController.score)
    router.get('/score/list', scoreController.getAllScore)
    router.get('/score/search/:id', scoreController.searchScore)
    router.put('/score/update', scoreController.updateScore)
    router.put('/score/CDR', scoreController.updateCDR)
    router.get('/score/check/:id',scoreController.checkCDR)
    router.delete('/score/delete/list', scoreController.deleteSTudentList)
}