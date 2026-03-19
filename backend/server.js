require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`);
  console.log('Routes: GET /  |  /api/auth  |  GET /api/products');
});

