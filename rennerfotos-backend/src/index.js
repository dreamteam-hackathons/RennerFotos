var restify = require('restify');
require('dotenv').config()

var rennerFotosRepository = require('../../rennerfotos-common/Repositories/rennerfotos.repository');
 
const server = restify.createServer({
  name: 'rennerfotos-backend',
  version: '1.0.0'
});
 
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
server.get('/v1/fotos', async function (req, res, next) {
  res.json(await rennerFotosRepository.getAllPhotos());

  return next();
});

server.get('/imagens/*', restify.plugins.serveStatic({
  directory: process.env.PATH_DATABASE_IMAGENS,
  appendRequestPath: false
}));
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});