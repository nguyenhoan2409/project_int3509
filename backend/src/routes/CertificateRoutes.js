module.exports = function (router) {

    var certificateController = require('../controllers/CertificateController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/certificate/getAll', verifyUser.isAuth, certificateController.getAllCertificate); 
    router.get('/certificate/getById/:id', verifyUser.isAuth, certificateController.getCertificateRequestById); 
    router.post('/certificate/create', verifyUser.isAuth, certificateController.createCertificate); 
    router.patch('/certificate/confirm', verifyUser.isAuth, certificateController.confirmCertificateStatus); 
}