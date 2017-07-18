const express = require('express');
const port    = process.env.PORT || 3000;
const app     = express();
const dest    = `${__dirname}/public`;

//app uses static files that are found in the const of dest, which in this case is /public
app.use(express.static(dest));

//when a get request is made to any address on the server, respond with the index.html found in the public folder
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

//listens for connections over the port that is stated in the const above. It is then announced as a console.log
app.listen(port, () => console.log(`Express has started on port: ${port}`));
