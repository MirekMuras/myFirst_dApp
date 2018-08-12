const assert = require('assert');                   //check-test if one value is equeal to another
const ganache = require("ganache-cli");
const Web3 = require('web3');                       //constructor 
const provider = ganache.provider();
const web3 = new Web3(provider);          //instance of Web3, provider is function to comunicate with web3 and ganache 

//testin framework with mocha test network , threee main functions
//1-it function will run individual test, assertin [testing]

//2-descripe function, group colectoion of 'it' functions

//3-beforeEach function, extract some logic and run the code only one time

class Car {
    park() {
    return 'stopped';
    }

drive() {

    return 'run';
    }
}

//test
describe('Car', () => {
    it('testing car.park() function', () => {
        //test setup with asssert logic
        const car = new Car();
        //checking if the car.park() return the 'stopped' valu from the function
        assert.equal(car.park(), 'stopped');        
    });
});