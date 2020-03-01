const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //bu token 3 farklı yerden gelebilir
    //1- headerlardan (postman'de headers kısmında key'e x-access-token yazıp value'ye token değerini yazmak gibi )
    //2- direkt post işleminden (yani postmande post işlemi yaparken aynı username title yazar gibi token yazıp
    //karşılığına token değerini yazarak da giriş yapabiliriz.)
    //3- direkt route'tan yani localhost:3000/api/movies?token=87353174913lsndkjnfds gibi
    //o yüzden üçünü de yazdık.
    const token=req.headers['x-access-token'] || req.body.token || req.query.token

    if(!token){
        res.json({status:false,message:'No token provided!'})
    }
    else{
        jwt.verify(token, req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({status:false,message:'Failed to authenticate token!'})
            }
            else{
                //next demek herşey yolunda artık herhangi bir route ile eşleşebilirsin demek
                next();
            }

        })
    }
}