const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../../app');

chai.use(chaiHttp);

let token, movieId;

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

    describe('/POST movies',()=>{
        it('it should post a movie', (done)=>{
            const movie={
                title:"Udemy",
                director_id:"5e5a7853da1cc3730c16e972",
                category:"Comedy",
                country:"Turkey",
                year:1950,
                imdb_score:8.2
            }
            chai.request(server).post('/api/movies').send(movie).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');

                movieId=res.body._id;

                done();
            })
        })
    })

    describe('/GET/:movieId movies', ()=>{
        it('it should get movies by the given id',(done)=>{
            chai.request(server).get('/api/movies/'+movieId).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                //body'deki _id property'si movieId'ye eşit olmalı
                res.body.should.have.property('_id').eql(movieId);

                done();

            })
        })
    })
})