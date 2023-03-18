import Order from "./order.js";
class Controller {
    async create (req, res) {
        try {
            const {
                special_path,
                special_picture,
                slug,
                tabel,
                order,
                hookah,
                commission_user
            } = req.body;
            const or = await Order.create({
                special_path,
                special_picture,
                slug,
                tabel,
                order,
                hookah,
                commission_user
            });
            res.status(200).json(or);
        } catch (e) {
            res.status(500).json('Error:' + e);
        }
    }
    async get (req, res) {
        try {
            const order = await Order.find();
            res.status(200).json(order)
        } catch (e) {
            res.status(500).json('Error:' + e);
        }
    }
    async update (req, res) {
        try {
            const order = req.body;
            const updateOrder = await Order.findByIdAndUpdate(order._id, order, {new: true});
            res.status(201).json(updateOrder);
        } catch (e) {
            res.status(500).json('Error:' + e);
        }
    }
};

export default new Controller;