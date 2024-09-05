// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_DB_URI);
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.log("Error connecting to MongoDB", error.message);
// 	}
// };

// export default connectToMongoDB;



// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
//   const mongoURI = process.env.MONGO_DB_URL;

//   if (!mongoURI) {
//     console.error('Error: MONGO_URI is not defined in the environment variables.');
//     process.exit(1); // Exit the process with failure
//   }

//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit the process with failure
//   }
// };

// export default connectToMongoDB;



import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const mongoURI = process.env.MONGO_DB_URL;

  if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process with failure
  }

  try {
    await mongoose.connect(mongoURI); // No options needed for MongoDB driver >= 4.0.0
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToMongoDB;

