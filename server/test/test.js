const mongoose = require('mongoose');
const User = require('../models/User');
const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = chai.should();

const testUsers = [
  { email: 'john@beatles.com', password: '123' },
  { email: 'paul@beatles.com', password: '123' },
  { email: 'george@beatles.com', password: '123' },
  { email: 'ringo@beatles.com', password: '123' },
  { email: 'mick@stones.com', password: '123' },
  { email: 'keith@stones.com', password: '123' },
  { email: 'charlie@stones.com', password: '123' },
  { email: 'ron@stones.com', password: '123' },
  { email: 'bill@stones.com', password: '123' }
];
let token = '';
let listOfUsers = [];
chai.use(chaiHttp);
describe('Tests', () => {
  before(done => {
    User.deleteMany({}, err => {
      done();
    });
  });
  describe('/POST signup', () => {
    for (let user of testUsers) {
      it(`it should sign up user ${user.email}`, done => {
        chai
          .request(server)
          .post('/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    }
  });
  describe('/POST signup', () => {
    it(`it should try to sign up existing user and recieve error`, done => {
      chai
        .request(server)
        .post('/signup')
        .send(testUsers[0])
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/POST login', () => {
    it('it should try to login in user and get token', done => {
      chai
        .request(server)
        .post('/login')
        .send(testUsers[0])
        .end(function(err, res) {
          res.should.have.status(200);
          token = res.body.token;
          done();
        });
    });
  });
  describe('/GET me', () => {
    it(`it should try to get me`, done => {
      chai
        .request(server)
        .get('/me')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          const user = res.body;
          user.should.be.an('object');
          done();
        });
    });
  });
  describe('/POST me/update-password', () => {
    it(`it should try to change password`, done => {
      chai
        .request(server)
        .post('/me/update-password')
        .send({ password: '456' })
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/POST login', () => {
    it('it should try to login with old password and recieve error', done => {
      chai
        .request(server)
        .post('/login')
        .send(testUsers[0])
        .end(function(err, res) {
          res.should.have.status(401);
          done();
        });
    });
  });
  describe('/POST login', () => {
    it('it should try to login in again with new password and recieve token', done => {
      testUsers[0].password = '456';
      chai
        .request(server)
        .post('/login')
        .send(testUsers[0])
        .end(function(err, res) {
          res.should.have.status(200);
          token = res.body.token;
          done();
        });
    });
  });
  describe('/GET most-liked', () => {
    it(`it should try to get list of users`, done => {
      chai
        .request(server)
        .get('/most-liked')
        .end((err, res) => {
          res.should.have.status(200);
          listOfUsers = res.body;
          listOfUsers.should.be.an('array');
          done();
        });
    });
  });
  describe('/GET user/:id/', () => {
    it(`it should try to get info for a user`, done => {
      chai
        .request(server)
        .get(`/user/${listOfUsers[2]._id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          const user = res.body;
          user.should.be.an('object');
          done();
        });
    });
  });
  describe('/POST user/:id/like', () => {
    it(`it should try to like a user`, done => {
      chai
        .request(server)
        .post(`/user/${listOfUsers[2]._id}/like`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/POST user/:id/like', () => {
    it(`it should try to like a user again and recieve error`, done => {
      chai
        .request(server)
        .post(`/user/${listOfUsers[2]._id}/like`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
  describe('/GET most-liked', () => {
    it(`it should try to get list of users and check the liked user is on top`, done => {
      chai
        .request(server)
        .get('/most-liked')
        .end((err, res) => {
          res.should.have.status(200);
          const listOfSortedUsers = res.body;
          expect(listOfSortedUsers[0]._id).to.equal(listOfUsers[2]._id);
          done();
        });
    });
  });
  describe('/POST user/:id/unlike', () => {
    it(`it should try to unlike a user`, done => {
      chai
        .request(server)
        .post(`/user/${listOfUsers[2]._id}/unlike`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/POST user/:id/unlike', () => {
    it(`it should try to unlike a user again and recieve error`, done => {
      chai
        .request(server)
        .post(`/user/${listOfUsers[2]._id}/unlike`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
  describe('/GET user/:id/', () => {
    it(`it should try to get info for the user and check that it has 0 likes`, done => {
      chai
        .request(server)
        .get(`/user/${listOfUsers[2]._id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          const user = res.body;
          user.should.be.an('object');
          expect(user.likes).to.equal(0);
          done();
        });
    });
  });
});
