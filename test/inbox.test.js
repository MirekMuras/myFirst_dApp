const assert = require('assert');                   //check-test if one value is equeal to another
const ganach = require('ganache-cli');
const Web3 = require('web3');                       //constructor 
const web3 = new Web3(ganache.provider());          //instance of Web3, provider is function to comunicate with web3 and ganache 

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
    it('has a park function', () => {
        const car = new Car();
        assert.equal(car.park(), 'stopped');
    });
});