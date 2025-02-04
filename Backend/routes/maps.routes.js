const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapcontroller = require('../controllers/map.controller');
const { query, validationResult } = require('express-validator');

// GET endpoint for coordinates
router.get('/get-coordinates',
    query('address')
        .exists()
        .notEmpty()
        .withMessage('Address is required')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 characters'),
    authMiddleware.authUser,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapcontroller.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('Origin must be at least 3 characters'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters'),
    authMiddleware.authUser,
    mapcontroller.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }).withMessage('Input must be at least 3 characters'),
    authMiddleware.authUser,
    mapcontroller.getSuggestions
)

module.exports = router;