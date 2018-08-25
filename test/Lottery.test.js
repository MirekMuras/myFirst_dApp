const assert = require('assert');                           //require assert library
const ganache = require('ganache-cli');                     //require ganache local network
const Web3 = require('web3');                               //require from constructor function Web3

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode} = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy ({
        data: bytecode
    })
    .send ({
        from: accounts[0], 
        gas: '1000000'
    })
    lottery.setProvider(provider);
});

describe('Lottery Contract', () => {
    //@dev: check if the project was succesfuly deployed in Local test Netwotk
    it('deploys a contract', () => {
      assert.ok(lottery.options.address);
    });

    //@dev: Enter only one account and store it in an array
    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({                    //enter into the Lottery
            from: accounts[0],                                  //who is attending to enter
            value: web3.utils.toWei('0.02', 'ether')            //Web3 library conversion method ETH to Wei 
        });

        const players = await lottery.methods.getPlayers().call({   //attend to get list of players addressie
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);                  //assert that only account[0] record is in record
        assert.equal(1, players.length);                        //
    });

        //@dev: Enter multiple accounts and store them in an array
    it('allows multiple account to enter', async () => {
        await lottery.methods.enter().send({                    //enter into the Lottery
            from: accounts[0],                                  //who is attending to enter
            value: web3.utils.toWei('0.02', 'ether')            //Web3 library conversion method ETH to Wei 
        });
        await lottery.methods.enter().send({                    //enter into the Lottery
            from: accounts[1],                                  //who is attending to enter
            value: web3.utils.toWei('0.02', 'ether')            //Web3 library conversion method ETH to Wei 
        });
        await lottery.methods.enter().send({                    //enter into the Lottery
            from: accounts[2],                                  //who is attending to enter
            value: web3.utils.toWei('0.02', 'ether')            //Web3 library conversion method ETH to Wei 
        });

        const players = await lottery.methods.getPlayers().call({   //attend to get list of players addressie
            from: accounts[0]
        });

        
        assert.equal(accounts[0], players[0]);                  //assert that only account[0] record is in record
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);                        //
    });

    //@dev:Try / Catch statment if something went wrong
    it('requires a minimum amount of ether to enter', async () =>{
        try {                                                   //the code will try if enough money are deposited
           await lottery.methods.enter().send({
               from: accounts[0],
               value: 10
           }); 
           assert(false);                                       //fail the test if reached  
        } catch (error) {
            assert(error)
        }
    });

    //@dev: Only manager can pick a winner
    //@pre: IF somenone else other than manager will try to pick a winner, the contract will through a error
    it('only manager can pick a winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    //@dev: pick ether and reset the payers array
    //@pre: testing with only One plater 
    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1','ether') 
        });

         const initialBalance = await web3.eth.getBalance(accounts[0]);         //Function which return amount in Wei that the given account controls
        
         await lottery.methods.pickWinner().send({                              //pick a winner 
             from: accounts[0]
         });

         const finalBalance = await web3.eth.getBalance(accounts[0])            // final balance minus gas

         const difference = finalBalance - initialBalance;
         //console.log(finalBalance-initialBalance);                            //print what is a actual balance 
         assert(difference > web3.utils.toWei('0.9', 'ether'));                 //the balance should be higher than 0.9
        });
    });
