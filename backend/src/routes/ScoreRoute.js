module.exports = function (router) {

    var scoreController = require('../controllers/ScoreController')

    router.get('/score/list', scoreController.getAllScore)
    router.get('/score/search/:id', scoreController.searchScore)
    router.patch('/score/update', scoreController.updateScore)
    router.patch('/score/CDR', scoreController.updateCDR)
    router.get('/score/check/:id',scoreController.checkCDR)
    router.delete('/score/delete/list', scoreController.deleteSTudentList)
    router.post('/student/add', scoreController.addStudent)
    router.patch('/score/add', scoreController.addScore)
    router.post('/score/certificate', scoreController.getCertificate)
}