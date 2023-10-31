const router = require('express').Router();
// import user model
const { User } = require('../../models');
// import sign token function from auth
const { signToken, authMiddleware } = require('../../utils/auth');

// get a single user by either their id or their username
router.get('/me', authMiddleware, async ({ user = null, params }, res) => {
    try {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
        res.json(foundUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
        }
});

// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
router.post('/', async ({ body }, res) => {
    try {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        };
        const token = signToken(user);
        res.json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
        }
});

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
router.post('/login', async ({ body }, res) => {
    try {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.checkPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
        }
});


module.exports = router;
