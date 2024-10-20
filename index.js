const express = require('express');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
var cors = require('cors')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/db');
const Task = require('./model/Task');
const User = require('./model/User');
const { isAuthenticatedUser } = require('./middleware/auth');
const Order = require('./model/Order');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;
const secret_key = process.env.SECRET_KEY;

app.use(cors({
  origin: '*'
}));

//** Database Connection
connectDB();

//** Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//** Cloudinary Image Upload Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//** APIs Router
app.get('/api/v1/get', isAuthenticatedUser, async (req, res) => {
  try {
    const data = await Task.find({ userId: req.user._id });
    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/v1/save', isAuthenticatedUser, async (req, res) => {
  const user = req.user;
  const exist = await Task.find({ userId: req.user._id });
  let payload = { ...req.body, userId: user._id };
  if (exist.length === 0) {
    const data = Task(payload);
    await data.save();
    return res.json({ success: true, message: 'Data Save Successfully' });
  } else {
    await Task.updateOne({ userId: req.user._id }, payload);
    return res.json({ success: true, message: 'Data Synced Successfully' });
  }
});

/////////////////////////////////////////
//** Credential Task
/////////////////////////////////////////

//** Register

app.post('/api/v1/register', async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    const user = await User.find({ email });
    if (user.length > 0) {
      return res.json({ success: false, message: 'Email is already exist' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const data = new User({
      name,
      email,
      password: hash,
      gender,
    });
    await data.save();
    res.json({ success: true, message: 'Account Create Successfully' });
  } catch (error) {
    res.json({ error });
  }
});

//** Login
app.post('/api/v1/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: 'Please Enter a valid email and password',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid email and password',
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.json({
        success: false,
        message: 'Invalid email and password',
      });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, secret_key);
    res.json({ success: true, message: 'Login Successfully', token });
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/v1/me', isAuthenticatedUser, async (req, res) => {
  const data = await User.findById(req.user._id).select('-password');
  res.json({ success: true, data });
});

//** Profile Update
app.post(
  '/api/v1/user/updateprofile',
  isAuthenticatedUser,
  async (req, res) => {
    try {
      const newDataEntry = {
        name: req.body.name,
        gender: req.body.gender,
      };

      if (req.body.avatar !== '') {
        const user = await User.findById(req.user._id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const opts = {
          folder: 'reactnative',
          width: 150,
          crop: 'scale',
          overwrite: true,
          invalidate: true,
        };

        const myCloud = await cloudinary.v2.uploader.upload(
          req.body.avatar,
          opts,
        );
        newDataEntry.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      await User.findByIdAndUpdate(req.user._id, newDataEntry, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res
        .status(200)
        .json({ success: true, message: 'Profile Update Successfully' });
    } catch (error) {
      console.log(error);
    }
  },
);



app.post('/api/v1/test', async (req, res) => {
  try {
    const orders = req.body; // Expecting array of orders in the request body

    const StoreExist = await Order.find({ store_name: orders[0].store_name })

    if (!StoreExist) {
      // Save each order in MongoDB
      for (const orderData of orders) {
        const order = new Order(orderData); // Create a new Order instance with the data
        await order.save(); // Save the order to the database
      }
    } else {
      return res.status(200).send('Orders already updated');
    }

    res.status(200).send('Orders saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving orders');
  }
});

app.post('/api/v1/testsingle', async (req, res) => {
  try {
    const orders = req.body; // Expecting array of orders in the request body
    console.log(orders);
    // Save each order in MongoDB
    const order = new Order(orders); // Create a new Order instance with the data
    await order.save(); // Save the order to the database

    res.status(200).send('Orders saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving orders');
  }

});



app.get('/api/v1/test/get', async (req, res) => {
  const order = await Order.find();
  res.status(200).json({ order });

});


//** Server Listen
app.listen(port, () =>
  console.log(`SERVER IS LISTENING http://localhost:${process.env.PORT}`),
);