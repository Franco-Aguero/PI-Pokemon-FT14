/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  "name": "Pikachu",
  "hp" : 20,
  "attack": 60,
  "defense": 26,
  "special_defense": 35,
  "special_attack": 80,
  "speed": 68,
  "height": 2,
  "weight": 99,
  "types":[
      {"id":1, "name": "normal"}
  ],
  "image": null
};

xdescribe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
});

describe("GET/types", () => {/* TEST ROUTES */
  it("responds with 200", () => agent.get('/types').expect(200));
  it("responds with one array", () =>
    agent.get('/types').then((res)=>{
      expect(res).to.be.a('object')
    }))
})