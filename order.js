import mongoose from "mongoose";

const Order = new mongoose.Schema({
    special_path: {type: String, required: false},
    special_picture: {type: String, required: false},
    slug: {type: String, required: true},
    tabel: {type: String, required: true},
    order: {type: Array, required: true},
    hookah: {type: Array, required: true},
    commission_user: {type: Number, required: true}
});

export default mongoose.model('Order', Order);