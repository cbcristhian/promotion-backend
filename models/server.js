const express = require('express');
const cors = require ('cors');


class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT || 3000;
        this.middlewares();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }


    start(){
        this.app.listen(process.env.PORT || 3000,()=>{
            console.log('Servidor levantado en : ',this.port);
        });
    }
}


module.exports=Server;