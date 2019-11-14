const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

const publicPath = path.resolve(__dirname, "../dist");

app.use(express.static(publicPath));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(publicPath, './index.html'));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
