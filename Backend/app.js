const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 3000;


// Connect to MongoDB
// mongodb+srv://dharaniashok021:cxDkgJiuggA5ESZD@nature.rpznl7r.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://dharaniashok021:Dharani@123@nature.rpznl7r.mongodb.net/?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://dharaniashok021:Dharani%40123@nature.rpznl7r.mongodb.net/?retryWrites=true&w=majority', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Create a User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model('User', userSchema);


// POST method to create a new user
app.post('/createUser', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    // name=req.body.name
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', newUser,  redirectTo: '/login' });
    } catch (error) {
      // Check if the error is a duplicate key violation
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // If it's a different error, handle it as a general server error
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// POST method for user login
app.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Include user details in the response
        const userDetails = {
          userId: user._id,
          name: user.name,
          email: user.email,
          // Add other user details as needed
        };
  
        res.status(200).json({ message: 'Login successful', userDetails, redirectTo: '/dashboard' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

app.get('/listUsers', async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Define product schemas  <---------------------------->
const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const bonsaiSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const FlowerSaplingSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const FruitSaplingSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const OrganicManureSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const GardeningToolSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const VegetableSaplingSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const FruitSeedSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const VegetableSeedSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

//schema for feedback
const Product = mongoose.model('Products', productSchema);
const Bonsai = mongoose.model('bonsai', bonsaiSchema);
const FlowerSapling = mongoose.model('flowersapling', FlowerSaplingSchema);
const FruitSapling = mongoose.model('fruitsapling', FruitSaplingSchema);
const OrganicManure = mongoose.model('organicmanure', OrganicManureSchema);
const GardeningTool = mongoose.model('gardeningtool', GardeningToolSchema);
const VegetableSapling = mongoose.model('vegetablesapling', VegetableSaplingSchema);
const FruitSeed = mongoose.model('fruitseed', FruitSeedSchema);
const VegetableSeed = mongoose.model('vegetableseed', VegetableSeedSchema);
//feedback

app.get('/products/all', async (req, res) => {
  try {
    // Fetch products from all categories
    const allProducts = await Promise.all([
      Product.find(),
      Bonsai.find(),
      FlowerSapling.find(),
      FruitSapling.find(),
      OrganicManure.find(),
      GardeningTool.find(),
      VegetableSapling.find(),
      FruitSeed.find(),
      VegetableSeed.find(),
    ]);
    // Combine the results into a single array
    const combinedProducts = allProducts.reduce((acc, categoryProducts) => acc.concat(categoryProducts), []);

    res.json(combinedProducts);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// bonsai
app.get('/products/bonsai', async (req, res) => {
  try {
    const Bonsais = await Bonsai.find();
    res.json(Bonsais);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/products/bonsai', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newBonsai = new Bonsai({
      name,
      imageUrl,
    });

    await newBonsai.save();

    res.status(201).json({ message: 'Bonsai product added successfully', newBonsai });
  } catch (error) {
    // Handle errors, for example, duplicate key violation
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Bonsai with the same name already exists' });
    }

    console.error('Error creating bonsai product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//delete bonsai
app.delete('/products/bonsai/:id', async (req, res) => {
  const bonsaiId = req.params.id;

  try {
    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(bonsaiId)) {
      return res.status(400).json({ message: 'Invalid Bonsai ID' });
    }

    // Attempt to delete the Bonsai by ID
    const deletedBonsai = await Bonsai.findByIdAndDelete(bonsaiId);

    // Check if the Bonsai was found and deleted successfully
    if (!deletedBonsai) {
      return res.status(404).json({ message: 'Bonsai not found' });
    }

    res.json({ message: 'Bonsai deleted successfully', deletedBonsai });
  } catch (error) {
    console.error('Error deleting bonsai product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Flower Sapling
app.get('/products/flower-saplings', async (req, res) => {
  try {
    const flowerSaplings = await FlowerSapling.find();
    res.json(flowerSaplings);
  } catch (error) {
    console.error('Error fetching flower saplings:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/products/flower-saplings', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newFlowerSapling = new FlowerSapling({
      name,
      imageUrl,
    });

    await newFlowerSapling.save();

    res.status(201).json({ message: 'Flower Sapling product added successfully', newFlowerSapling });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Flower Sapling with the same name already exists' });
    }

    console.error('Error creating flower sapling product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fruit-sapling
app.get('/products/fruit-saplings', async (req, res) => {
  try {
    const fruitSaplings = await FruitSapling.find();
    res.json(fruitSaplings);
  } catch (error) {
    console.error('Error fetching fruit saplings:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/products/fruit-saplings', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newFruitSapling = new FruitSapling({
      name,
      imageUrl,
    });

    await newFruitSapling.save();

    res.status(201).json({ message: 'Fruit Sapling product added successfully', newFruitSapling });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Fruit Sapling with the same name already exists' });
    }

    console.error('Error creating fruit sapling product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Organic-manure
app.get('/products/organic-manure', async (req, res) => {
  try {
    const organicManure = await OrganicManure.find();
    res.json(organicManure);
  } catch (error) {
    console.error('Error fetching organic manure:', error);
    res.status(500).send('Internal Server Error');
  }
});


// POST Organic Manure
app.post('/products/organic-manure', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newOrganicManure = new OrganicManure({
      name,
      imageUrl,
    });

    await newOrganicManure.save();

    res.status(201).json({ message: 'Organic Manure product added successfully', newOrganicManure });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Organic Manure with the same name already exists' });
    }

    console.error('Error creating organic manure product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET Gardening Tools
app.get('/products/gardening-tools', async (req, res) => {
  try {
    const gardeningTools = await GardeningTool.find();
    res.json(gardeningTools);
  } catch (error) {
    console.error('Error fetching gardening tools:', error);
    res.status(500).send('Internal Server Error');
  }
});


// POST Gardening Tool
app.post('/products/gardening-tools', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newGardeningTool = new GardeningTool({
      name,
      imageUrl,
    });

    await newGardeningTool.save();

    res.status(201).json({ message: 'Gardening Tool product added successfully', newGardeningTool });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Gardening Tool with the same name already exists' });
    }

    console.error('Error creating gardening tool product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET Vegetable Saplings
app.get('/products/vegetable-saplings', async (req, res) => {
  try {
    const vegetableSaplings = await VegetableSapling.find();
    res.json(vegetableSaplings);
  } catch (error) {
    console.error('Error fetching vegetable saplings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST Vegetable Sapling
app.post('/products/vegetable-saplings', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newVegetableSapling = new VegetableSapling({
      name,
      imageUrl,
    });

    await newVegetableSapling.save();

    res.status(201).json({ message: 'Vegetable Sapling product added successfully', newVegetableSapling });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Vegetable Sapling with the same name already exists' });
    }

    console.error('Error creating vegetable sapling product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET Fruit Seeds
app.get('/products/fruit-seeds', async (req, res) => {
  try {
    const fruitSeeds = await FruitSeed.find();
    res.json(fruitSeeds);
  } catch (error) {
    console.error('Error fetching fruit seeds:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Vegetable Seeds
app.get('/products/vegetable-seeds', async (req, res) => {
  try {
    const vegetableSeeds = await VegetableSeed.find();
    res.json(vegetableSeeds);
  } catch (error) {
    console.error('Error fetching vegetable seeds:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST Fruit Seed
app.post('/products/fruit-seeds', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newFruitSeed = new FruitSeed({
      name,
      imageUrl,
    });

    await newFruitSeed.save();

    res.status(201).json({ message: 'Fruit Seed product added successfully', newFruitSeed });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Fruit Seed with the same name already exists' });
    }

    console.error('Error creating fruit seed product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST Vegetable Seed
app.post('/products/vegetable-seeds', async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newVegetableSeed = new VegetableSeed({
      name,
      imageUrl,
    });

    await newVegetableSeed.save();

    res.status(201).json({ message: 'Vegetable Seed product added successfully', newVegetableSeed });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Vegetable Seed with the same name already exists' });
    }

    console.error('Error creating vegetable seed product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//feedback post
const Feedback = mongoose.model('Feedback', new mongoose.Schema({ feed: String }));

app.post('/feedback', async (req, res) => {
    try {
        const { feed } = req.body;
        
        if (!feed) {
            return res.status(400).json({ error: 'Feedback cannot be empty' });
        }

        const newFeedback = new Feedback({ feed });
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//contactus

const contacts = mongoose.model('contact', new mongoose.Schema({ name:String,email:String,phonenumber:Number,message:String }));

app.post('/contactus', async (req, res) => {
    try {
        const { name,email,phonenumber,message } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'contact cannot be empty' });
        }

        const newcontact = new contacts({ 
          name,
          email,
          phonenumber,
          message 
        });

        await newcontact.save();

        res.status(201).json({ message: 'contact saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//productdetails 

const productdetailschema = new mongoose.Schema({
  name:String,
  imageUrl:String

})

const prodshow = mongoose.model('proddetails',productdetailschema)

app.get('/products/:id', async (req, res) => {
  try {
    // console.log('Received product Id:',req.params.id)
    const product = await prodshow.findById(req.params.id.toString());
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//post

// app.post('/products/details', async (req, res) => {
//   const { prodid,name, imageUrl } = req.body;

//   try {
//     const productvals = new prodshow({
//       prodid,
//       name,
//       imageUrl,
//     });

//     await productvals.save();

//     res.status(201).json({ message: 'product details added successfully', productvals });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'details with the same name already exists' });
//     }

//     console.error('Error creating product:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

//

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


