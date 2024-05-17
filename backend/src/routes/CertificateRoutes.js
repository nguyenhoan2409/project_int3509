module.exports = function (router) {

    var certificateController = require('../controllers/CertificateController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/api/certificate/getAll', verifyUser.isAuth, certificateController.getAllCertificate); 
    router.get('/api/certificate/getById/:id', verifyUser.isAuth, certificateController.getCertificateRequestById); 
    router.post('/api/certificate/create', verifyUser.isAuth, certificateController.createCertificate); 
    router.patch('/api/certificate/confirm', verifyUser.isAuth, certificateController.confirmCertificateStatus); 
}