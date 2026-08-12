const Newsletter = require('../models/NewsletterSchema');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide an email address' });
        }

        const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase().trim() });

        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: 'Email is already subscribed to the newsletter' });
        }

        const newSubscriber = await Newsletter.create({ email });

        res.status(201).json({ success: true, message: 'Successfully subscribed to the newsletter', subscriber: newSubscriber });
    } catch (error) {
        console.error('Newsletter Subscription Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { subscribeNewsletter };
