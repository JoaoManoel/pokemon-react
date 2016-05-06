var app = require('express')();
var cors = require('cors');
var x = require('x-ray')();

app.use(cors());

app.get('/', function(req, res) {
  res.json({"hello": "World"});
});

app.get('/moves', function(req, res) {
  var pokemon = req.query.pokemon;
  x('http://pokemondb.net/pokedex/'+ pokemon + '/moves/1', {
    'image': '.figure img @src',
    'moves': x('#svtabs_moves_1', {
      'learntBy': 'div div h2',
      'list': x('div div table tbody tr', [{
        'level': 'td:nth-child(1)',
        'move': 'td:nth-child(2)',
        'type': 'td:nth-child(3)',
        'category': 'td:nth-child(4)',
        'power': 'td:nth-child(5)',
        'accurary': 'td:nth-child(6)',
      }])
    })
  }).stream().pipe(res);
});

app.listen(8053);
