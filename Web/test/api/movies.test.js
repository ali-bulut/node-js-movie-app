const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies tests', ()=>{
    //before ile test işlemi başlamadan önce yapmak istediğimiz işlemleri yaparız.
    before((done)=>{
        chai.request(server).post('/login').send({username:"alibulut", password:"123456"}).end((err,res)=>{
            token=res.body.token;
            done();
        })
    })

    describe('/GET movies', ()=>{
        it('it should GET all the movies', (done)=>{
            //header'a yukarıda çektiğimiz tokenı yazdık ki /api/movies'e erişim sıkıntısı olmasın
            chai.request(server).get('/api/movies').set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                //res.body yani dönen data bir array olmalı demek.
                res.body.should.be.a('array');
                done();
            })
        })
    })
})