const express = require('express');
const app =  express();
const port = process.env.PORT || 8000

const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const options = {
	
	native_parser: true,
		
	poolSize: 5,
			
	user: 'admin',
		
	pass: 'admin',
			
	promiseLibrary: global.Promise,
		
	autoIndex: false, // Don't build indexes
		    
	reconnectTries: 30, // Retry up to 30 times
		   
	reconnectInterval: 500, // Reconnect every 500ms
	
        bufferMaxEntries: 0,
	
	connectWithNoPrimary: true 
		
};
		

mongoose.connect('mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-shard-00-00-ycjdj.mongodb.net:27017,node-rest-shop-shard-00-01-ycjdj.mongodb.net:27017,node-rest-shop-shard-00-02-ycjdj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true', options);
/*mongoose.connection.on('error', (err) => {		

	mediator.emit('db.error', err);

});
		
mongoose.connection.on('connected', () => {

	mediator.emit('db.ready', mongoose);

});*/

/*mongoose.connect('mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-shard-00-00-ycjdj.mongodb.net:27017,node-rest-shop-shard-00-01-ycjdj.mongodb.net:27017,node-rest-shop-shard-00-02-ycjdj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
{
  usemongoClient:true
})*/

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accepted, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE'),
    res.status(200).json({});
  }
  next();
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next)=>{
  const error = new Error('Not Found');
  error.status(404);
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  res.json({
    error:{ message: error.message} 
  })
})

app.listen(port, function(){
  console.log('Server listening at '+port)
})