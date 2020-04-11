const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const ytsr = require('ytsr');

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 minutes 20 request
  max: 10 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
const port = 3000;

var allowedOrigins = ['http://localhost:' + port];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.options("*", cors());


app.get("/", (req, res) => {
  res.send("Welcome to mewsick api")
})


app.get('/song', async (req, res) =>
  ytdl
    .getInfo(req.query.id)
    .then(info => {
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      res.set('Cache-Control', 'public, max-age=20000'); //6hrs aprox
      res.json(audioFormats[1].url)
    })
    .catch(err => res.status(400).json(err.message))
);

app.get('/search', async (req, res) => {
    console.log(req.query.q)
    let filter;
    ytsr.getFilters(req.query.q, function (err, filters) {
      if (err) throw err;
      filter = filters.get('Type').find(o => o.name === 'Video');
      ytsr.getFilters(filter.ref, function (err, filters) {
        if (err) throw err;
        filter = filters.get('Duration').find(o => o.name.startsWith('Short'));
        var options = {
          limit: 5,
          nextpageRef: filter.ref,
        };
        ytsr(null, options, function (err, searchResults) {
          if (err) throw err;
          res.set('Cache-Control', 'public, max-age=20000'); //6hrs aprox
          console.log(searchResults);
          res.json(searchResults.items.map((d) => {
            return {
              "title": d.title,
              "thumbnail": d.thumbnail,
              "duration": d.duration,
              "views": d.views,
              "id": d.link.split("?v=")[1]
            }
          }))
        });
      });
    });

  }
);


app.listen(port, () => console.log(`Server is listening on port ${port}.`));

// Search suggestion
// http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=Query