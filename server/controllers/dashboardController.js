const Order = require('../models/OrderSchema');
const Product = require('../models/ProductSchema');
const User = require('../models/UserSchema');

// @desc    Get Admin Dashboard Statistics
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        // 1. Overview Statistics
        const totalUsers = await User.countDocuments({ role: 'User' });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, totalRevenue: { $sum: "$pricing.total" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // 2. Recent Orders
        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(5)
            .select('_id user contactEmail createdAt pricing orderStatus');
            
        const formattedRecentOrders = recentOrders.map(order => ({
            orderId: order._id,
            customer: order.user ? order.user.name : (order.contactEmail || 'Guest'),
            date: order.createdAt,
            amount: order.pricing.total,
            status: order.orderStatus
        }));

        // 3. Top Selling Products
        const topSellingProducts = await Order.aggregate([
            { $unwind: "$orderItems" },
            { $match: { paymentStatus: 'Paid' } },
            { 
                $group: {
                    _id: "$orderItems.product",
                    name: { $first: "$orderItems.name" },
                    image: { $first: "$orderItems.image" },
                    sold: { $sum: "$orderItems.quantity" },
                    revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
                }
            },
            { $sort: { sold: -1 } },
            { $limit: 5 }
        ]);

        // 4. Low Stock Products
        const lowStockProducts = await Product.find({ stockQuantity: { $lt: 10 } })
            .sort({ stockQuantity: 1 })
            .limit(5)
            .select('productName stockQuantity _id');

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalOrders,
                    totalRevenue,
                    totalProducts,
                    totalUsers
                },
                recentOrders: formattedRecentOrders,
                topSellingProducts: topSellingProducts.map(p => ({
                    productId: p._id,
                    name: p.name,
                    image: p.image,
                    sold: p.sold,
                    revenue: p.revenue
                })),
                lowStockProducts: lowStockProducts.map(p => ({
                    productId: p._id,
                    productName: p.productName,
                    sku: p._id.toString().substring(0, 8).toUpperCase(), // Using ID substring as SKU
                    stock: p.stockQuantity,
                    status: 'Low Stock'
                }))
            }
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { getDashboardStats };
