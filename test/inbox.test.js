const assert = require('assert');                   //check-test/comparing  if one value is equeal to another
const ganache = require("ganache-cli");
const Web3 = require('web3');                       //constructor 
const provider = ganache.provider();
const web3 = new Web3(provider);                    //instance of Web3, provider is function to comunicate with web3 and ganache 
const { interface, bytecode } = require('../compile');


/* -------------- MOCHA testing  -------------------------------------------- */
/*
// MOCHA testing framework have a three main functions
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

//@dev: test using ' beforeEach ' function have to have defined variable before function, specificaly with word 'let'
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
    */

    /* -------------------------- MOCHA structure -------------------------------------- */ 
    // 1 - Mocha starts
    // 2 - Deploy a new contract        ------->               beforeEach
    // 3 - Manipulate the contract      ------->               it
    // 4 - Make an assertion about the contract                it
    // 5 - do it over again

    let accounts;
    let inbox;

    // @dev : use web3 to access unlock account in Ganach Local Test Network
    beforeEach(async () => {
        // @dev : Get a list of all acounts
        accounts = await web3.eth.getAccounts();

        // @dev: use onw of the account to deploy the contract
        inbox = await new web3.eth.Contract(JSON.parse(interface))              // interface from a Contract constructor
        .deploy({                                                               // deploy a new contract from Web3
            data: bytecode, 
            arguments: ["A new copy of this contract was deploy by Web3."] 
        })
        .send({                                                                 // 
            from: accounts[0], 
            gas: "1000000"
        })

    });

    describe('Inbox', () => {
        it('deploy a contract', () => {
            console.log(inbox);
            //assert.ok(inbox.options.address);
        });
});