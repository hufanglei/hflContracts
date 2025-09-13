
const HflToken = artifacts.require("./HflToken.sol");
const Exchange = artifacts.require("./Exchange.sol");

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';


const fromWei = (bn) => web3.utils.fromWei(bn, 'ether');

const toWei = (num) => web3.utils.toWei(num.toString(), 'ether');

const wait = (seconds) => {
    const milliseconds = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = async function (callback) {

   try {
        const hflToken = await HflToken.deployed();
        const exchange = await Exchange.deployed();
        const accounts = await web3.eth.getAccounts();

        for(let i = 1; i <= 5; i++) {
            await exchange.makeOrder(hflToken.address, toWei(100 + i), ETHER_ADDRESS, toWei(i/1000), {from: accounts[0]});
            console.log(`account[0]制作第${i}个订单`);
            await wait(1)
        }

        for(let i = 1; i <= 5; i++) {
            await exchange.makeOrder(hflToken.address, toWei(100 + i), ETHER_ADDRESS, toWei(i/100), {from: accounts[1]});
            console.log(`account[1]制作第${i}个订单`);
            await wait(1)
        }

        console.log("account[0]-在交易所的以太币", fromWei(

            await exchange.tokens(ETHER_ADDRESS, accounts[0])
        ));

        console.log("account[1]-在交易所的HFL币", fromWei(
            await exchange.tokens(hflToken.address, accounts[1])
        ));

        console.log("account[1]-在交易所的以太币", fromWei(
            await exchange.tokens(ETHER_ADDRESS, accounts[1])
        ));

         console.log("account[2]-在交易所的HFL币", fromWei(
            await exchange.tokens(hflToken.address, accounts[2])
        ));

   
   }catch(error){
       console.log(error) 
   }

    callback();
    
}