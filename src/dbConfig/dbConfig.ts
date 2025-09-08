import mongoose  from "mongoose";

export async function connect(){
    try {
      await  mongoose.connect(`${process.env.MONGO_URI}/saurabhgarkoti22`!) //typescript error solution->!
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('Mongodb connected');
            
        })
        connection.on('error',(err)=>{
            console.log('mongodb connection error: ' + err);
            process.exit()
            
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB');    
        console.log(error);
        
        
    }
}