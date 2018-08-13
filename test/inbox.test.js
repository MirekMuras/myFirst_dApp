const assert = require('assert');                   //check-test/comparing  if one value is equeal to another
const ganache = require("ganache-cli");
const Web3 = require('web3');                       //constructor 
const provider = ganache.provider();
const web3 = new Web3(provider);          //instance of Web3, provider is function to comunicate with web3 and ganache 

//MOCHA testing framework have a three main functions
//1-' it ' function will run one individual test, assertin [testing] on something we want to test

//2- ' descripe ' function, group colectoion of 'it' functions

//3- ' beforeEach '  function, extract some amount of logic and execute the code only one time comment to set of 'it' block

class Car {
    park() {
    return 'stopped';
    }

    drive() {
        return 'run';
    }
  }

//test
let car;
beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    // assert all ' it ' functions

    //@dev:  test the park function
    //@par:  will return the park function value ' stopped ' if the function is correct and called
    it('testing car.park() function. If you can see the msg. the test passed', () => {
        //test setup with asssert logic
        
        //const car = new Car();            -----> declare the variable and group it is ' beforeEach ' function
        //@dev: checking if the car.park() return the 'stopped' valu from the function
        //@par: should return ' stopped ' value if passed othervise faild the test
        assert.equal(car.park(), 'stopped');        
    });

    //@dev: tty second ' it ' test function
    //@prov:
    it('testing car.driver() function. If you see the msg., the assertion passed', () => {
        //const car = new Car();
        assert.equal(car.drive(), 'run');
    });
});