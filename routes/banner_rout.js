const express = require('express');
const router = express.Router();

const {
    GetBanners,
    CreateBanner,
    UpdateBanner,
    DeleteBanner,
} = require('../controller/banner_ctrl')

router.get('/banners', GetBanners);

router.post('/banners', CreateBanner);

router.put('/banners/:id', UpdateBanner);

router.delete('/banners/:id', DeleteBanner);

module.exports = router;