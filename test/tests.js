const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const nanoid = require('nanoid');

chai.use(chaiHttp);

    //Testes para todas as solicitações PUT's
    describe('/PUT Shorten URL', () => {
        
        it('Chamada sem CUSTOM_ALIAS', done => {
            chai.request('http://localhost:3001')
            .put('/create?url=http://www.vale.com')
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
            });
        });
        
        it('Chamada com CUSTOM_ALIAS', done => {
            chai.request('http://localhost:3001')
            .put(`/create?url=http://www.vale.com&CUSTOM_ALIAS=vale_brasil_${nanoid(7)}`)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
            });
        });

        it('Chamada com CUSTOM_ALIAS que já existe', done => {
            chai.request('http://localhost:3001')
            .put('/create?url=http://www.vale.com&CUSTOM_ALIAS=vale')
            .end((err, res) => {
                res.body.should.be.a('object');
            done();
            });
        });
        
    });

    //Testes para todas as solicitações GET's
    describe('/GET Shorten URL', () => {
        it('Caso a URL não exista', done => {
            chai.request('http://localhost:3001') 
            .get('/nao_existe') 
            .end((err, res) => {
                res.should.have.status(404); 
                res.body.should.be.a('object');
                done();
            });
        });

        it('Caso a URL exista', done => {
            chai.request('http://localhost:3001') 
            .get('/vale') 
            .end((err, res) => {
                res.should.have.status(200); 
                done();
            });
        });        

        it('Endpoint com as dez URLs mais acessadas', done => {
            chai.request('http://localhost:3001') 
            .get('/most_accessed') 
            .end((err, res) => {
                res.should.have.status(200); 
                res.body.should.be.a('array');
                done();
            });
        });
    });