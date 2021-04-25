const express= require('express'); 
const app=express(); 
const cors= require('cors')

app.set('port',process.env.PORT || 3000)

app.use(cors()); 
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api',require('./router/routes')); 

app.listen(app.get('port'), ()=>{
    console.log('servidor en el puerto 3000')
}); 
