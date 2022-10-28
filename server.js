const express = require('express');
const favicon = require('express-favicon');
const path = require('path');


const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
// the __dirname is the current directory from where the script is running
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => { console.log(`Server is up on port ${port}!`); });

