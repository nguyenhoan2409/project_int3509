module.exports = function (router) {

    var scoreController = require('../controllers/ScoreController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/score/list', verifyUser.isAuth, scoreController.getAllScore)
    
    router.get('/score/search/:id', verifyUser.isAuth, scoreController.searchScore)

    router.patch('/score/update', verifyUser.isAuth,scoreController.updateScore)

    router.patch('/score/CDR', verifyUser.isAuth, scoreController.updateCDR)

    router.get('/score/check/:id', verifyUser.isAuth, scoreController.checkCDR)

    router.delete('/score/delete/list', scoreController.deleteSTudentList)

    router.post('/student/add', verifyUser.isAuth, scoreController.addStudent)

    router.patch('/score/add', verifyUser.isAuth, scoreController.addScore)

    router.post('/score/certificate', verifyUser.isAuth, scoreController.getCertificate)
}