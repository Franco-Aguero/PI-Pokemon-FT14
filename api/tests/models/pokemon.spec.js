const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
var poke= {
  "name": null,
  "hp" : null,
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

xdescribe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
});

describe("Pokemon model atribute HP", () => 
  
  it("create with HP null", () => {
    Pokemon.create(poke)
    .then((res)=>{
      expect(res).to.equal(200)
    })
    
  })
)