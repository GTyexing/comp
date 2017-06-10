const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(compression());

// serve our static stuff like build.js
app.use('/', express.static(path.join(__dirname, 'build')));

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost:${PORT}`);
});
