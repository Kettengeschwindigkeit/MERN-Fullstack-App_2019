const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'This user is already exist' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User created' })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try it again' })
        }
    })

// /api/auth/login
router.post('/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Please enter the password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, try it again' })
            }

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })

            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try it again' })
        }
    })

module.exports = router
