module.exports = function (router) {

    var scoreController = require('../controllers/ScoreController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/api/score/list', verifyUser.isAuth, scoreController.getAllScore)
    
    router.get('/api/score/search/:id', verifyUser.isAuth, scoreController.searchScore)

    router.patch('/api/score/update', verifyUser.isAuth,scoreController.updateScore)

    router.get('/api/score/CDR', verifyUser.isAuth, scoreController.updateCDR)

    router.get('/api/score/check/:id', verifyUser.isAuth, scoreController.checkCDR)

    router.delete('/api/score/delete/list', scoreController.deleteSTudentList)

    router.post('/api/student/add', verifyUser.isAuth, scoreController.createStudent)

    router.patch('/api/score/add', verifyUser.isAuth, scoreController.addScore)

}