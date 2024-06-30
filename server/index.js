import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRouters from './routes/auth.js'
import userRoutes from './routes/users.js'
import menuRoutes from './routes/menu.js'
import reviewRouters from './routes/reviews.js'
import cartRoute from './routes/cart_item.js'
import orderRouters from './routes/orders.js'

const app = express();


//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());


//routes
app.use("/api/auth", authRouters);
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reviews", reviewRouters);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRouters);

var port = 8800;

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});