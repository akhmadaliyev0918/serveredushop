const Banner = require('../model/banner')

// Get all banners

const GetBanners = async (req, res) => {
    try {
        const data = await Banner.find()
        res.json({
            data,
            success: true,
            message: 'All banner data'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Create a new banner

const CreateBanner = async (req, res) => {
    const { imageUrl, link } = req.body

    if (!imageUrl || !link) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        })
    }

    try {
        const banner = new Banner({ imageUrl, link })
        await banner.save()
        res.json({
            success: true,
            message: 'Banner created successfully',
            data: banner
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Update a banner

const UpdateBanner = async (req, res) => {
    const { bannerId } = req.params
    const { imageUrl, link } = req.body

    if (!bannerId || !imageUrl || !link) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        })
    }
    try {
        const banner = await Banner.findByIdAndUpdate(bannerId, { imageUrl, link }, { new: true })

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: 'Banner not found'
            })
        }

        res.json({
            success: true,
            message: 'Banner updated successfully',
            data: banner
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

// Delete a banner

const DeleteBanner = async (req, res) => {
    const { bannerId } = req.params
    try {
        const banner = await Banner.findByIdAndDelete(bannerId)
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: 'Banner not found'
            })
        }
        res.json({
            success: true,
            message: 'Banner deleted successfully'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    GetBanners,
    CreateBanner,
    UpdateBanner,
    DeleteBanner,
}