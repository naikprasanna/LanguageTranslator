
const express= require('express');
const app=express();
const translateRoute= require('./routes/translate');
const indexRouter= require('./routes/index')
const PORT=3000;


//ROUTES
app.use('/translate',translateRoute);
app.use('/',indexRouter);


//SERVER CREATION
app.listen(PORT,(err)=>{
    console.log('server is listening on port ',PORT);

})
