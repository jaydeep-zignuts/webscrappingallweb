const router = require('express').Router();
const bonveloBikeController = require('../controller/bonveloBikeController')

module.exports = (app) =>{
    app.use('/', router);
    router.get('/cardLink', bonveloBikeController.getBikeCardLink);
    router.put('/bikeDetails', bonveloBikeController.getBikeDetails);
    router.put('/downloadImage', bonveloBikeController.downloadImage);
    
}