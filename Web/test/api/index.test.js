const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../../app');

chai.use(chaiHttp);

//ilk parametre açıklama'dır. İstediğin şeyi yazabilirsin.
describe('Node Server', ()=>{
    //it'ler test edilmesini istediğin şeylerdir.
    //birden fazla it kullanabilirsin.
    it("(GET /) returns the homepage",(done)=>{

        // / yani anasayfaya server aracılığıyla istek yap.
        chai.request(server).get('/').end((err,res)=>{
            //gelen response'un status code'u 200 olmalı.
            res.should.have.status(200);

            //200 ise done methodunu çalıştırır.
            //done -> test bitti herşey yolunda sıkıntı yok demek
            done();
        })
        
    })
})