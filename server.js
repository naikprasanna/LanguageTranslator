
const express= require('express');
const app=express();
const translateRoute= require('./routes/translate');
const indexRouter= require('./routes/index');
const createDatabase=require('./routes/createdatabase');
const PORT=process.env.PORT;




//ROUTES
app.use('/translate',translateRoute);
app.use('/',indexRouter);
app.use('/createdb',createDatabase);


//SERVER CREATION
app.listen(PORT,(err)=>{
    console.log('server is listening on port ',PORT);

})
