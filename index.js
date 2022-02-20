import express from 'express';

// import cors from 'cors';

const app = express();
const port = process.env.PORT || 38000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
