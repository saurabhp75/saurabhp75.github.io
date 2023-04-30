---
title: "Blockchain"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Blockchain", "Web3"]
draft: false
description: "Intro to Blockchain development"
---

## What is Bitcoin

- A system to allow peer to peer payments without a financial inermediary for eg. bank.

## What is Ethereum

- Smart contract and decentralized application platform, not just to transfer money.
- Need for more programatic control of transactions.
- Enable creation of decentralized autonomous corporations (DAC).
- Introduced idea of smart contracts as an entity that can send and recieve currency, beyond just humans.
- Ethereum networks are used to transfer money and store data.
- Ethereum networks is a collection of nodes running Ethereum client.
- Anyone can run a node.
- Each node contains full copy of the blockchain.
- Blockchain is a database that stores a record of every transaction that has ever taken place.

## Interaction with Ethereum Blockchain

- `Programmatic`: web3.js
- `Non programmatic`: Metamask (Browser extension)

### Chrome plugin for metamask

## Metamask account contents

- Metamask account can be used to interact with any network/blockchain. No need to create seperate accounts.
- `Account Address`: Similar to an email address/username.
- `Public key`
- `Private key`: Never share this with anyone, this gives access to funds in the account.

One metamask account can interact with multiple Ethereum Blockchain/network like main net and test net.

## Ethereum test networks

- Ropsten
- Kovan
- Rinkeby

- `Faucet`: Get free Ethers from `rinkeby-faucet.com`

## Ethereum transaction object

- Describes transfer of funds from one account to another.
- Created using web3js library.
- Multiple transaction objects are contained in a block.

## Contents of Ethereum transaction object

- `Transaction object`: A record which describes one account attempting to send money to other account.
- It is created when two accounts exchange money.
- v,r,s cannot be used to generate the senders priate key.

| Keyword               | description                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------ |
| **nonce**             | How many times the sender has sent a transaction (in lifetime)                        |
| **to**                | Address of the account this money is going to                                         |
| **value**             | Amount of Wei to be sent to target address (or contract)                              |
| **gasPrice**          | Amount of Wei sender is willing to pay per unit gas to get this transaction processed |
| **startGas/gasLimit** | Units of gas this transaction can consume                                             |
| **v**                 | Cryptographic piece of data that can be used                                          |
| **r**                 | to generate the sender's account address                                              |
| **s**                 | generated from the sender's private key                                               |

### Sequence of transferring funds to another account on Blockchain:

- Web3js at client side sends transaction object to a node in Blockchain.
- The node consolidates all received transaction objects into a block.
- Then the node validates the block(mining) and confirms back to the client.
- The validation takes time.

### Hashing fundamentals

- Hash of a content is unique. Change in content will change the hash.
- The content cannot be retrieved from the hash.

### Generic Blockchain fundamentals

- When a new block is added to the blockchain the nonce filled is set such that hash field start with 4 zeros.
- The process of finding suitable nonce is called mining.
- Modifying any block will invalidate all later blocks as their previous and hash field will change and will not be a valid hash.
- So if we change any block that we have to mine (find new nonce) all the later blocks.
- Even if we mine all later blocks on a node, we can figure out tampering by matching the last block with other nodes in the network.
- Mining (finding nonce) is done by all network nodes, as soon as any node finds a solution, it distributes it across network.

## Contents of generic blockchain

| Field         | description                                     |
| :------------ | :---------------------------------------------- |
| **Block no.** | Block no. in the blockchain                     |
| **Nonce**     | A number such that the hash starts with 4 zeros |
| **data**      | Some data (Token/transactions)                  |
| **Prev**      | Hash of previous block                          |
| **Hash**      | The hash of above four fields                   |

## Ethereum specific blockchain

- The nonce is set such that the hash value is less than some target value (instead of 4 leading zeros).
- Target target value is adjusted to change block time as computing power in the chain varies due to no. of active nodes in the chain.
- The time to find a suitable nonce is called **block time**. This has to be shared with other nodes on the chain to keep them updated.
- The confirmation time by a blockchain is mining time plus the distribution time.
- Ethereum has a target block time of **15 seconds**.
- After every blocked is mined, the network calculates how long it took and adjust the target value of hash to meet Ethereum block time of 15 seconds.
- If the time taken is large the target value of hash is raised to reduce block mining time.
- If the time taken is less the target value of hash is reduced to increase block mining time.
- The mining time changes over time as number of active nodes at any given time changes.

[**Link to see block time of Ethereum blockchain https://etherscan.io/chart/blocktime**](https://remix.ethereum.org/)
Shows Averagre amount of time taken to calculate the blocks in the Ethereum chain.

## Smart contracts to build interesting apps (Dapps) on the network

- Smart contract is an account controlled by the code.

### Contract account contents/fields

- `Balance`: Amount of ether the account owns.
- `Storage`: Data storage for this contract.
- `Code`: Raw machine code for this contract. It is writen in `Solidity` language.

### External Account

- Decoupled from any individual network.
- Created by humans or an entity.

### Contract account

- Specific to one individual network/Chain.
- It is an instance of a contract which is created by compiling a source file.
- Multiple instance of contract from same source file can be deployed on a single network.

## External account to create contract transaction (revisit)

## Solidity language

- Written in `.sol` files.
- Strongly typed.
- Similar to JS.
- Has lot of gotchas.

## Smart contract

- Code is written in Solidity language.
- Solidity compiler processes the code and churns out byte code and ABI.
- byte code is deployed on the block chain.
- ABI is used by javascript applications to interact with the smart contract/byte code.

[**IDE for Solidity (Remix) https://remix.ethereum.org/**](https://remix.ethereum.org/)

## Remix editor:

- `Latest solidity version`: 0.8.5
- `Practical on solidity version`: 04.17.

```solidity
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }

}
```

## Common function types

| Keyword      | description                                                      |
| :----------- | :--------------------------------------------------------------- |
| **Public**   | Anyone with Ethereum account can call this function              |
| **Private**  | Only this contract can call this function                        |
| **View**     | This function returns data & does not modify the contract's data |
| **Constant** | This function returns data & does not modify the contract's data |
| **Pure**     | This function will not modify and even read the contracts's data |
| **Payable**  | When someone call this function they might send Ether along      |

- See other function types in Solidity.
- `returns` is used for function marked as view or constant.

## Remix IDE

- When you deploy contract using remix ide, it is deployed on the in browser fake network.
- Remix ide host a tiny fake Ethereum network in a javascript VM.
- The instance of the contract is deployed on the fake network.
- The code is compiled into a bytecode and then deployed to the fake network.
- When a storage variable is define as public within a contract, the contract deifnes a function with same name as the variable.
- Calling the above function will return the value of the variable.
- Creating a contract is very similar to a fund transfer transaction.
- The `to` field is left as blank.
- An external account creates a contract by sending transaction object (See below).
- It is very similar to the transaction object to transfer funds, except the `to` field which is blank and `data` field which contains bytecode.
- Running a transaction on remix doesn't take time but on test net and main net (public network) it will take time.

## External account to create contract transaction

| Keyword               | description                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------ |
| **nonce**             | How many times the sender has sent a transaction                                      |
| **to**                | - (left blank)                                                                        |
| **data**              | Compiled bytecode of the contract                                                     |
| **value**             | Amount of Wei to be sent to target address (or contract)                              |
| **gasPrice**          | Amount of Wei sender is willing to pay per unit gas to get this transaction processed |
| **startGas/gasLimit** | Units of gas this transaction can consume                                             |
| **v**                 | Cryptographic piece of data that can be used                                          |
| **r**                 | to generate the sender's account address                                              |
| **s**                 | generated from the sender's private key                                               |

## Ways to run a contract function

| **First Way**                 | **Second way**                      |
| :---------------------------- | :---------------------------------- |
| Calling a function            | Sending a transaction to a function |
| Cannot modify contract's data | Can modify contract's data          |
| Can return data               | returns the transaction hash        |
| Runs instantly                | Takes time to execute               |
| Free to do                    | costs money                         |

## Gas and Wei

- We pay gas fee to the nodes running our transactions on blockchain.
- Running a transaction involves modifying and storing data and running the code, which incurrs gas (cost).
- The gas price is paid by the one who is creating a transaction, ie the user of Dapp.
- 1 Ether is equal to 1e+18 wei.
- To see gas price search for EIP-150.
- `gasPrice`:
- `gasLimit`:

## Mnemonic and ethereum accounts

- Using mnemonic we can create and manage multiple account and need not remember details of each account.
- We only need to remember the 12 word mnemonic.
- If you have to work with new mnemonic to manage new group of accounts then you have to remove and install metamask.

## [To get free Ether from faucet](https://faucet.rinkeby.io/)

## Truffle

- One stop shop for development of ethereum contracts.
- Contract creation.
- Local testing.
- Deployment.
- Still in early developmet so features may not work.

## Boilerplate design

| **Issue**                                                                                    | **Solution**                                                       |
| :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Need to be able to write solidity code in JS project                                         | Setup solidity compiler to build our contracts                     |
| Need some way to quickly test contracts without manual testing we were doing in remix editor | Setup custom mocha test runner that can somehow test solidity code |
| Need someway to deploy our contract to public networks                                       | Setup compile script to compile and deploy our comtract            |

## Ganache

- A library which can be used to install small test Ethereum network.
- Earlier it was called TestRPC.
- Automatically creates accounts for us to use.
- Accounts are created in unlocked state, so we don't need private/public keys.

## Web3 versions

- Web3 versions `v0.x.x` and `v1.x.x`.
- Starting with 0, only has callbacks to support async code.
- Starting with 1, has support for promise and async/await to support async code.

## Web3 providers

- Using Web3 library, we create instance(s) of Web3 library.
- Each instance can interact with a single Ethereum network.
- Web3 instance needs a provider to interact with Ethereum network.
- `Provider` acts as a communication layer between Web3 instace and the ethereum network.
- Provider provides the functions to send and receive request to/from an Ethereum netwrok.

## Deploying to local Ganache network

![Provider](/assets/images/blockchain/provider.jpg)

## Mocha

- It is a testing framework.
- following are the functions supported in Mocha

| **Function**   | **Purpose**                      |
| :------------- | :------------------------------- |
| **it**         | Run a test and make an assertion |
| **describe**   | Groups together it functions     |
| **beforeEach** | Executes some general setup code |

### Creating contract on Ethereum network

-To create a contract an external account makes a transaction with the Ethereum network.

- In such transaction, the `to` field is empty.
- `data` field contain the compiled bytecode of the contract.
- value field contain the amount of Wei to be sent to target address??

Information needed by web3 to deploy a contract and communicate with an already deployed contract.

## Deploying the contract to "real" test network

- Use infura.
- Infura is an API which provides access to node installed on rinkeby network.
- Infura is an alternative to installing a Rinkeby node locally, which is complicated.
- diagram of interfaces with the test nw.

![Infura Provider](/assets/images/blockchain/provider_infura.jpg)

### truffle-hdwallet-provider

- This npm package gives a provider for communication between web3 nd rinkeby nw and also unlock an account to deploy the contract.

### Interacting with deployed contract without a front-end

- Use Remix online editor with injected web3.

## Basic Solidity types

- `string`: Sequence of characters.
- `bool`: true/false
- `int`: Interger, positive or negative.Has no decimal. int8, int16, int32..int256(default), no of bits used to store a number.
- `uint`: Unsigned integer,positive number. has no decimal. uint8, uint16, uint32..uint256(default).
- `fixed/ufixed`: "Fixed" point number. Number with a decimal after it.
- `adrress`: Has methods tied to it for sending money.
- There are other types like an Array or a mapping.

### msg global variable

- Available when any account does a transaction or call a function on the Ethereum nw.

| **Property Name** | **Description**                                                           |
| :---------------- | :------------------------------------------------------------------------ |
| **msg.data**      | Data field from the call or transaction thatinvoked the current function. |
| **msg.gas**       | Amount of gas the current function invocation has available .             |
| **msg.sender**    | Address of the account that started the current function invocation.      |
| **msg.value**     | Amount of Wei that was sent along with the function invocation.           |

## Reference types in Solidity

- Fixed Array
- Dynamic array
- Mapping
- Struct

- **Note**: For a public array the automatically generated method expects an index of the element you want to retrieve.

### Solidity gotcha

- nested arrays can't be communicated between solidity and js/web3/abi world.
- since strings in solidity are internally stored as dynamic arrays, the above limitation holds for array of strings.

- **Note**: payable function type is used when the user wants to send ether.

## Global function

- `require()`: it's a validation function. If it fails, further execution is suspended.

this.balance: amount of money in the contract.

address type has transfer method on it to transfer eth to the address.

### Function modifier

- Can be used to restrict access to function using require().
- Ends with \_;
- then use the function name as a modifier for other function.
- Behind the scenes, solidity compiler places the code of modified function at underscore.

For eg.

```
modifier restricted (){
require();
\_;
}
```

### Web3 utility methods

- web3.eth.getBalance(accountAddress): Get the balance amount in an address/wallet.
- web3.ethtoWei("0.1", "eth"): Convert 0.1 eth to Wei.

## Building Dapp

- Metamask injects web3 library in the active page when it is running in the browser.
- Metamask uses old version of web3 library, so our app need to highjack the provider of metamask which provides connectivity with the nw and also holds the account information.
- The Dapp needs the interface (obtained from compilation) to the contract and the address of the deployed contract.
- The dapp interacts with local contracts intance created using web3.
- When calling contract methods from the Dapp, we don't specify `from` parameter as it is already defined in the `provider` provided by metamask.
- When sending a transaction from the Dapp, we have to specify the `from` address.

`export default new web3.eth.Contract(abi, address)??`

## Rendering contract data in a component

- Component renders.
- componentDidMount called.
- "call" methods on the contract.
- set data on "state".
