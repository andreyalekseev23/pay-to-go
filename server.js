import express from 'express';
import mongoose from 'mongoose';
import router from "./router.js";

const PORT = 5000;
const BD_KEY = 'mongodb+srv://t1ep1l0t:t1ep1l0t@cluster0.xa939zx.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(express.json());

app.use('/', express.static('frontend/dist'))
app.use('/api', router);

app.post('/', (req,res) => {
    res.status(200).json('Server worked');
});

async function startApp() {
    try {
        await mongoose.connect(BD_KEY);
        app.listen(PORT, '192.168.1.7', () =>  console.log('SERVER STARTED ON PORT: '+ PORT));
    } catch (e) {
        console.log(e);
    }
};

startApp ();