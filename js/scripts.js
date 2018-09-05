// X confirmations needed to confirm the vote
let confirmationsNeeded = 6;
// Gas price dummy
let gasPrice = "0x4A817C800";
// Address of the smart contract
let address = localStorage.getItem('smilo_web3js_test');
let amountOfCalls = 0;
let nodeUrl = "";
console.log("Saved address: " + address);

testNode();

$(document).ready(() => {
    $(".test-button").click(() => {
        $(".compat-content").hide();
        $(".no-ganache-cli-info").hide();
        $(".spinner").show();
        resetFields();
        testNode();
    });
});

/**
 * Tests the node and sets up a test UI for a contract (voting contract in this case);
 */
function testNode() {
    // Retrieve the ABI from the local json file
    fetch("./contracts/voting.sol").then(response => {
        return response.text();
    }).then((code) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/toAbi",
            dataType: "json",
            contentType: "application/json",
            data: code,
            success: (abi) => {
                if (abi.error) {
                    console.log(abi.error);
                } else {
                    nodeUrl = $(".node-url").val();
                    console.log("Node url: " + nodeUrl);
                    // Instantiate the web3 object
                    if (typeof web3 !== 'undefined') {
                        web3 = new Web3(web3.currentProvider);
                    } else {
                        web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
                        // web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
                    }
                    // Get the available accounts
                    web3.eth.getAccounts().then(accounts => {
                        // Create a voting contract instance
                        var votingInstance = new web3.eth.Contract(abi.abiDefinition);
                        $(".compat-contract-abi").html(syntaxHighlight(JSON.stringify(abi.abiDefinition, null, 4)));
                        $(".compat-contract-code").html(code);
                        // Just take the first one
                        web3.eth.defaultAccount = accounts[0];
                        // Same as the default account
                        votingInstance.options.from = web3.eth.defaultAccount;
                        if (web3.utils.isAddress(address)) {
                            web3.eth.getCode(address).then(data => {
                                if (data === "0x0") {
                                    $(".compat-deploy-new").text("true");
                                    deployContract(votingInstance, abi, accounts, nodeUrl);
                                } else {
                                    $(".compat-deploy-new").text("false");
                                    votingInstance.options.address = address;
                                    $(".compat-deploy-address").text(address);
                                    setupExampleUI(votingInstance);
                                    testRpcCalls(abi.abiDefinition, accounts, abi.byteCode, votingInstance);
                                    $(".contract-address").html("(" + nodeUrl + ")");
                                    $(".spinner").hide();
                                    $(".compat-content").show();
                                }
                            });
                        } else {
                            $(".compat-deploy-new").text("true");
                            deployContract(votingInstance, abi, accounts, nodeUrl);
                        }
                    }).catch(data => {
                        console.error(data);
                        $(".contract-address").html("(" + nodeUrl + ")");
                        $(".no-ganache-cli-info").show();
                        $(".spinner").hide();
                    });
                }
            }
        });
    });
}

function deployContract(votingInstance, abi, accounts, nodeUrl) {
    votingInstance.deploy({
        data: abi.byteCode,
        arguments: [[web3.utils.asciiToHex('Donald Trump'),web3.utils.asciiToHex('Barack Obama')]]
    }).send({
        from: web3.eth.defaultAccount,
        gas: 1500000,
        gasPrice: '30000000000000'
    }).on('error', (error) => {
        console.log("2. Error");
        console.log(error);
    }).on('transactionHash', (transactionHash) => {
        $(".compat-deploy-hash").text(transactionHash);
        $(".compat-deploy-hash-p").show();
    }).on('receipt', (receipt) => {

    }).on('confirmation', (confirmationNumber, receipt) => {

    }).then((newContractInstance) => {
        address = newContractInstance.options.address;
        $(".compat-deploy-address").text(address);
        votingInstance.options.address = address;
        localStorage.setItem('smilo_web3js_test', address);
        $(".contract-address").html("(" + nodeUrl + ")");
        setupExampleUI(votingInstance);
        testRpcCalls(abi.abiDefinition, accounts, abi.byteCode);
        $(".spinner").hide();
        $(".compat-content").show();
    });
}

function setupExampleUI(votingInstance) {
    // Get all candidates to vote on
    votingInstance.methods.getCandidateList().call((error, candidates) => {
        // When there's an error
        if (error) {
            // Just log it for now
            console.log(error);
        // So no error    
        } else {
            // Loop all candidates
            candidates.forEach((candidate) => {
                // We want one without special characters
                let candidateN = web3.utils.toAscii(candidate).replace(/[^\w\s]/gi, '');
                // And without spaces for selectors
                let candidateNS = candidateN.replace(new RegExp(" ", 'g'), "");
                // Add the candidate to the list of candidates
                addCandidateToList(candidateN, candidateNS);
                // Get the amount of votes for this candidate
                getCandidateVotes(candidate, candidateNS, votingInstance);
                // Add the clicklistener to vote on this candidate
                addVoteClickListener(candidate, candidateNS, votingInstance);
            });
        }
    });
}

/**
 * Add the candidate to the list of candidates
 * @param {string} candidateN - Candidate without special characters
 * @param {string} candidateNS - Candidate without special characters & spaces
 */
function addCandidateToList(candidateN, candidateNS) {
    $(".candidatesList").append(
        `<li>
            <p class="candidate">` + candidateN + `</p>
            <div>
                <button class="vote_button" id="vote_` + candidateNS + `"type="button">Vote!</button>
                <p class="total_votes total_votes_` + candidateNS +`" + >Total votes</p>
                <p class="votes" id="` + "votes_" + candidateNS + `"></p>
            </div>
            <div class="extra_info_div">
                <p class="info_header">Hash</p>
                <p class="info_text" id="` + "voting_hash_" + candidateNS + `">-</p>
                <p class="info_header">Confirmations</p>
                <p class="info_text" id="` + "voting_confirmations_" + candidateNS + `">-</p>
                <p class="info_header">Receipt</p>
                <pre>
                    <p class="info_text" id="` + "voting_receipt_" + candidateNS + `">-</p>
                </pre>
            </div>
        </li>`);
}

/**
 * Get the amount of votes for the candidate
 * @param {bytes32} candidate - Candidates as saved in the smart contract
 * @param {string} candidateNS - Candidate without special characters & spaces
 * @param {object} votingInstance - The voting contract instance
 */
function getCandidateVotes(candidate, candidateNS, votingInstance) {
    votingInstance.methods.totalVotesFor(candidate).call((error, votes) => {
        $("#votes_" + candidateNS).text(votes);
    });
}

/**
 * Adds a click listener to vote on that candidate
 * @param {bytes32} candidate - Candidates as saved in the smart contract
 * @param {string} candidateNS - Candidate without special characters & spaces
 * @param {object} votingInstance - The voting contract instance
 */
function addVoteClickListener(candidate, candidateNS, votingInstance) {
    // When clicking to vote
    $("#vote_" + candidateNS).click(() => {
        // Reset the info fields
        resetExtraInfoFields(candidateNS);
        // Make a vote
        callVote(candidate, candidateNS, votingInstance);
    });
}

/**
 * Vote on the candidate
 * @param {*} candidate - Candidates as saved in the smart contract
 * @param {*} candidateNS - Candidate without special characters & spaces
 * @param {*} votingInstance - The voting contract instance
 */
function callVote(candidate, candidateNS, votingInstance) {
    console.log("Voting for: " + candidate);
    // Send the vote for the candidate
    votingInstance.methods.voteForCandidate(candidate).send().
    // When there is a hash available
    on('transactionHash', (hash) => {
        // Show that hash on the candidate info field
        $("#voting_hash_" + candidateNS).text(hash);
    // When a confirmation comes in    
    }).on('confirmation', (number, receipt) => {
        // Only take first 6 confirmations
        if (number < 7) {
            // Stringify on 4 spaces
            $("#voting_receipt_" + candidateNS).html(syntaxHighlight(JSON.stringify(receipt, null, 4)));
            // Orange color default
            let color = "orange";
            // When all confirmed
            if (number === 6) {
                // Set to color green
                color = "green";
                // Increment the amount of votes
                $("#votes_" + candidateNS).text(Number($("#votes_" + candidateNS).text()) + 1);
            }
            // Set the confirmation amount
            $("#voting_confirmations_" + candidateNS).html("<p class=" + color + ">" + number + " / " + confirmationsNeeded + "</p>");
        }
    // When there's an error    
    }).on('error', console.error);
}

/**
 * Resets the extra info field 
 * @param {string} candidateNS - Candidate without special characters & spaces
 */
function resetExtraInfoFields(candidateNS) {
    $("#voting_hash_" + candidateNS).text("-");
    $("#voting_receipt_" + candidateNS).html("-");
    $("#voting_confirmations_" + candidateNS).text("-");
}

function showCompatibilityCheckContainer() {
    $(".example-container").hide();
    $(".compatibility-check-container").show();
}

function showExampleContainer() {
    $(".example-container").show();
    $(".compatibility-check-container").hide();   
}

function addContentToCard(selector, 
                        indexMethod, 
                        methodName, 
                        requestedData, 
                        requestResult, 
                        responseResult, 
                        requestSuccess, 
                        responseSuccess, 
                        paddingtop, 
                        link) {
    $(selector).append(`
        <div class="compat-results-div ` + (paddingtop ? `padding-top` : ``) + `"> 
            <p class="compat-result-header">#` + indexMethod + ` Method: <span class="compat-span">` + methodName + `</span> - <a href='` + link + `' target='_blank'>` + link + `</a></p>
            <div class="compat-results-check-div border-top">
                <p class="compat-result-header">Data sent <span class="compat-span"></span></p>
                <span class="compat-span ` + (requestSuccess ? `result-good` : `result-bad`) + `"><pre>` + requestedData + `</pre></span>
                ` + (requestSuccess ? 
                    `<img class='compat-result-img' src='./img/correct.png' alt='result-img' height='42' width='42'>`
                    : 
                    `<img class='compat-result-img' src='./img/bad.png' alt='result-img' height='42' width='42'>`
                ) + `
            </div>
            <div class="compat-results-check-div border-top">
                <p class="compat-result-header">Response: <span class="compat-span"></span></p>
                <span class="compat-span ` + (requestSuccess ? `result-good` : `result-bad`) + `"><pre>` + requestResult + `</pre></span>
                ` + (requestSuccess ? 
                    `<img class='compat-result-img' src='./img/correct.png' alt='result-img' height='42' width='42'>`
                    : 
                    `<img class='compat-result-img' src='./img/bad.png' alt='result-img' height='42' width='42'>`
                ) + `
            </div>
            <div class="compat-results-check-div border-top">
                <p class="compat-result-header">Response check: <span class="compat-span"></span></p>
                <span class="compat-span ` + (responseSuccess ? `result-good` : `result-bad`) + `">` + responseResult + `</span>
                ` + (responseSuccess ? 
                    `<img class='compat-result-img' src='./img/correct.png' alt='result-img' height='42' width='42'>`
                    : 
                    `<img class='compat-result-img' src='./img/bad.png' alt='result-img' height='42' width='42'>`
                ) + `
            </div>
        </div>
    `);
}

/**
 * Web3: https://web3js.readthedocs.io/en/1.0/
 */
function testRpcCalls(abi, accounts, byteCode, votingInstance) {
    web3_js_test_web3();                                                // NO RPC Calls
    web3_js_test_eth();                                                 // YES RPC Calls
    web3_js_test_subscribe();                                           // Node has no websocket available
    web3_js_test_contract(abi, accounts, byteCode, votingInstance);     // YES RPC Calls
    web3_js_test_accounts();                                            // NO NEW RPC Calls
    web3_js_test_personal();                                            // YES RPC Calls
    web3_js_test_iban();                                                // NO RPC Calls
    web3_js_test_abi();                                                 // NO RPC Calls
    web3_js_test_net();                                                 // YES RPC Calls
    web3_js_test_bzz();                                                 // Under construction
    web3_js_test_shh();                                                 // Under construction
    web3_js_test_utils();                                               // NO RPC Calls
}

function web3_js_test_web3() {
    // Web3.modules - Handled by the Web3.js library itself. No RPC Call
    // web3 object - Handled by the Web3.js library itself. No RPC Call
    // version - Handled by the Web3.js library itself. No RPC Call
    // utils - Handled by the Web3.js library itself. No RPC Call
    // setProvider - Handled by the Web3.js library itself. No RPC Call
    // providers - Handled by the Web3.js library itself. No RPC Call
    // givenProvider - Handled by the Web3.js library itself. No RPC Call
    // currentProvider - Handled by the Web3.js library itself. No RPC Call
    // BatchRequest - Handled by the Web3.js library itself. No RPC Call
    // extend - Handled by the Web3.js library itself. No RPC Call
}

function web3_js_test_eth() {
    /**
     * web3.eth
     */
    // Note on checksum addresses - Explanation page
    // subscribe - Module
    // Contract - Module
    // Iban - Module
    // personal - Module
    // accounts - Module
    // abi - Module
    // net - Module
    // setProvider - Handled by the Web3.js library itself. No RPC Call
    // providers - Handled by the Web3.js library itself. No RPC Call
    // givenProvider - Handled by the Web3.js library itself. No RPC Call
    // currentProvider - Handled by the Web3.js library itself. No RPC Call
    // BatchRequest - Handled by the Web3.js library itself. No RPC Call
    // extend - Handled by the Web3.js library itself. No RPC Call
    // defaultAccount - Handled by the Web3.js library itself. No RPC Call
    // defaultBlock - Handled by the Web3.js library itself. No RPC Call
    // getProtocolVersion
    eth_protocolVersion({jsonrpc: "2.0", method: "eth_protocolVersion"});

    // isSyncing
    eth_syncing({jsonrpc: "2.0", method: "eth_syncing"});

    // getCoinbase
    eth_coinbase({jsonrpc: "2.0", method: "eth_coinbase"});

    // isMining
    eth_mining({jsonrpc: "2.0", method: "eth_mining"});

    // getHashrate
    eth_hashrate({jsonrpc: "2.0", method: "eth_hashrate"});

    // getGasPrice
    eth_gasPrice({jsonrpc: "2.0", method: "eth_gasPrice"});

    // getAccounts
    eth_accounts({jsonrpc: "2.0", method: "eth_accounts"});

    // getBlockNumber
    eth_blockNumber({jsonrpc: "2.0", method: "eth_blockNumber"});

    // getBalance
    eth_getBalance({jsonrpc: "2.0", method: "eth_getBalance", params: [web3.eth.defaultAccount,"latest"]}, " - latest");
    eth_getBalance({jsonrpc: "2.0", method: "eth_getBalance", params: [web3.eth.defaultAccount,0]}, " - block 0");

    // getStorageAt
    eth_getStorageAt({jsonrpc: "2.0", method: "eth_getStorageAt", params: [web3.eth.defaultAccount,null,"latest"]}, " - latest");
    eth_getStorageAt({jsonrpc: "2.0", method: "eth_getStorageAt", params: [web3.eth.defaultAccount,null,0]}, " - block 0");
    
    // getCode
    eth_getCode({jsonrpc: "2.0", method: "eth_getCode", params: [web3.eth.defaultAccount,"latest"]}, " - latest");
    eth_getCode({jsonrpc: "2.0", method: "eth_getCode", params: [web3.eth.defaultAccount,0]}, " - block 0");

    // getBlock
    // eth_getBlockByNumber({"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["genesis", false]}, " - genesis"); // Doc says this is an option but it's not working
    eth_getBlockByNumber({jsonrpc: "2.0", method: "eth_getBlockByNumber", params:["latest", false]}, " - latest");
    eth_getBlockByNumber({jsonrpc: "2.0", method: "eth_getBlockByNumber", params:["pending", false]}, " - pending");

    // getBlockTransactionCount
    // eth_getBlockTransactionCountByNumber({"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["genesis"]}, " - genesis"); // Doc says this is an option but it's not working
    eth_getBlockTransactionCountByNumber({jsonrpc: "2.0", method: "eth_getBlockTransactionCountByNumber", params: ["latest"]}, " - latest");
    eth_getBlockTransactionCountByNumber({jsonrpc: "2.0", method: "eth_getBlockTransactionCountByNumber", params: ["pending"]}, " - pending");

    // getUncle -- Not Supported
    // getTransaction - Inside sendTransaction because we need a hash

    // getTransactionFromBlock
    // eth_getTransactionByBlockNumberAndIndex({"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["genesis",null]}, " - genesis"); // Doc says this is an option but it's not working
    eth_getTransactionByBlockNumberAndIndex({jsonrpc: "2.0", method: "eth_getTransactionByBlockNumberAndIndex", params: ["latest",null]}, " - latest");
    eth_getTransactionByBlockNumberAndIndex({jsonrpc: "2.0", method: "eth_getTransactionByBlockNumberAndIndex", params: ["pending",null]}, " - pending");

    // getTransactionReceipt - Inside sendTransaction because we need a hash

    // getTransactionCount
    eth_getTransactionCount({jsonrpc: "2.0", method: "eth_getTransactionCount", params: [web3.eth.defaultAccount, "latest"]}, " - latest");
    eth_getTransactionCount({jsonrpc: "2.0", method: "eth_getTransactionCount", params: [web3.eth.defaultAccount, 0]}, " - block 0");

    // sendTransaction - Following up: getTransaction && getTransactionReceipt. Can make use of nonce, value, gas, gasPrice but not tested here yet.
    eth_sendTransaction({jsonrpc:"2.0", method: "eth_sendTransaction", params: [{data:"0xcc9ab267446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address}]});

    // sendSignedTransaction - Requires signTransaction

    // sign
    eth_sign({jsonrpc: "2.0", method: "eth_sign", params: [web3.eth.defaultAccount.toLowerCase(), "0x48656c6c6f20776f726c64"]});

    // signTransaction - Not supported

    // call
    eth_call({jsonrpc: "2.0", method:"eth_call", params: [{data:"0x2f265cf7446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address}, "latest"]});

    // estimateGas
    eth_estimateGas({jsonrpc: "2.0", method:"eth_estimateGas", params: [{to: address, data: "0x2f265cf7446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount}]});

    // getPastLogs
    eth_getLogs({jsonrpc: "2.0", method: "eth_getLogs", params: [{address: web3.eth.defaultAccount.toLowerCase()}]});

    // getWork - Not supported
    // submitWork - Not supported
}

function web3_js_test_subscribe() {
    /**
     * web3.eth.subscribe
     */
    // subscribe - Error: The current provider doesn't support subscriptions: HttpProvider
    // clearSubscriptions - No subs to clear yet
    // subscribe(“pendingTransactions”) - Error: The current provider doesn't support subscriptions: HttpProvider
    // subscribe(“newBlockHeaders”) - Error: The current provider doesn't support subscriptions: HttpProvider
    // subscribe(“syncing”) - Error: The current provider doesn't support subscriptions: HttpProvider
    // subscribe(“logs”) - Error: The current provider doesn't support subscriptions: HttpProvider
}

function web3_js_test_contract(abi, accounts, byteCode, votingInstance) {
    /**
     * web3.eth.Contract
     */
    // new contract - Handled by the Web3.js library itself. No RPC Call
    // = Properties =
    // options - Handled by the Web3.js library itself. No RPC Call
    // options.address - Handled by the Web3.js library itself. No RPC Call
    // options.jsonInterface - Handled by the Web3.js library itself. No RPC Call
    // = Methods =
    // clone - Handled by the Web3.js library itself. No RPC Call
    // deploy - Makes use of eth_sendTransaction, eth_getTransactionReceipt & eth_getCode already defined 
    // methods - Bundled explanation
    // methods.myMethod.call
    contractGetCandidateList({jsonrpc: "2.0", method: "eth_call", params: [{data: "0xfdbc4006", from: web3.eth.defaultAccount, to: address}, "latest"]});
    isValidCandidate({jsonrpc: "2.0", method: "eth_call", params: [{data: "0x392e6678446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address}, "latest"]});
    isValidCandidate({jsonrpc: "2.0", method: "eth_call", params: [{data: "0x392e667842617261636b204f62616d610000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address}, "latest"]});
    voteForCandidate({jsonrpc: "2.0", method: "eth_sendTransaction", params: [{data: "0xcc9ab267446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount, gasPrice: "0x4a817c800", to: address}]});
    voteForCandidate({jsonrpc: "2.0", method: "eth_sendTransaction", params: [{data: "0xcc9ab26742617261636b204f62616d610000000000000000000000000000000000000000", from: web3.eth.defaultAccount, gasPrice: "0x4a817c800", to: address}]});
    totalVotesFor({jsonrpc: "2.0", method: "eth_call", params: [{data: "0x2f265cf7446f6e616c64205472756d700000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address},"latest"]});
    totalVotesFor({jsonrpc: "2.0", method: "eth_call", params: [{data: "0x2f265cf742617261636b204f62616d610000000000000000000000000000000000000000", from: web3.eth.defaultAccount, to: address},"latest"]});
    // methods.myMethod.send - Combination of eth_gasPrice, eth_sendTransaction and eth_getTransactionReceipt already defined
    // methods.myMethod.estimateGas
    // methods.myMethod.encodeABI - Handled by the Web3.js library itself. No RPC Call
    // = Events =
    // once - Error: The current provider doesn't support subscriptions: HttpProvider
    // events - Error: The current provider doesn't support subscriptions: HttpProvider
    // events.allEvents - Error: The current provider doesn't support subscriptions: HttpProvider
    // getPastEvents - Error: The current provider doesn't support subscriptions: HttpProvider
}

function web3_js_test_accounts() {
    /**
     * web3.eth.accounts
     */
    // create - Handled by the Web3.js library itself. No RPC Call
    // privateKeyToAccount - Handled by the Web3.js library itself. No RPC Call
    // signTransaction - Makes use of net_version, eth_gasPrice and eth_getTransactionCount already defined
    // recoverTransaction - Handled by the Web3.js library itself. No RPC Call
    // hashMessage - Handled by the Web3.js library itself. No RPC Call
    // sign - Handled by the Web3.js library itself. No RPC Call
    // recover - Handled by the Web3.js library itself. No RPC Call
    // encrypt - Handled by the Web3.js library itself. No RPC Call
    // decrypt - Handled by the Web3.js library itself. No RPC Call
    // wallet - Handled by the Web3.js library itself. No RPC Call
    // wallet.create  - Handled by the Web3.js library itself. No RPC Call
    // wallet.add - Handled by the Web3.js library itself. No RPC Call
    // wallet.remove - Handled by the Web3.js library itself. No RPC Call
    // wallet.clear - Handled by the Web3.js library itself. No RPC Call
    // wallet.encrypt - Handled by the Web3.js library itself. No RPC Call
    // wallet.decrypt - Handled by the Web3.js library itself. No RPC Call
    // wallet.save - Handled by the Web3.js library itself. No RPC Call
    // wallet.load - Handled by the Web3.js library itself. No RPC Call
}

function web3_js_test_personal() {
    /**
     * web3.eth.personal
     */
    // setProvider - EXCACLY the same as defined in Web3 main module... ?
    // providers - EXCACLY the same as defined in Web3 main module... ?
    // givenProvider - EXCACLY the same as defined in Web3 main module... ?
    // currentProvider - EXCACLY the same as defined in Web3 main module... ?
    // BatchRequest - EXCACLY the same as defined in Web3 main module... ?
    // extend - EXCACLY the same as defined in Web3 main module... ?
    // newAccount & unlock
    personal_newAccount_personal_unlockAccount({jsonrpc: "2.0", method: "personal_newAccount", params: ["ninjasinpajamas"]});
    // sign - Not supported
    // ecRecover - Not supported
    // signTransaction - Not supported
}

function web3_js_test_iban() {
    /**
     * web3.eth.Iban
     */
    // Iban instance - Handled by the Web3.js library itself. No RPC Call
    // Iban contructor - Handled by the Web3.js library itself. No RPC Call
    // toAddress - Handled by the Web3.js library itself. No RPC Call
    // toIban - Handled by the Web3.js library itself. No RPC Call
    // fromAddress - Handled by the Web3.js library itself. No RPC Call
    // fromBban - Handled by the Web3.js library itself. No RPC Call
    // createIndirect - Handled by the Web3.js library itself. No RPC Call
    // isValid - Handled by the Web3.js library itself. No RPC Call
    // prototype.isValid - Handled by the Web3.js library itself. No RPC Call
    // prototype.isDirect - Handled by the Web3.js library itself. No RPC Call
    // prototype.isIndirect - Handled by the Web3.js library itself. No RPC Call
    // prototype.checksum - Handled by the Web3.js library itself. No RPC Call
    // prototype.institution - Handled by the Web3.js library itself. No RPC Call
    // prototype.client - Handled by the Web3.js library itself. No RPC Call
    // prototype.toAddress - Handled by the Web3.js library itself. No RPC Call
    // prototype.toString - Handled by the Web3.js library itself. No RPC Call
}

function web3_js_test_abi() {
    /**
     * web3.eth.abi
     */
    // encodeFunctionSignature - Handled by the Web3.js library itself. No RPC Call
    // encodeEventSignature - Handled by the Web3.js library itself. No RPC Call
    // encodeParameter - Handled by the Web3.js library itself. No RPC Call
    // encodeParameters - Handled by the Web3.js library itself. No RPC Call
    // encodeFunctionCall - Handled by the Web3.js library itself. No RPC Call
    // decodeParameter - Handled by the Web3.js library itself. No RPC Call
    // decodeParameters - Handled by the Web3.js library itself. No RPC Call
    // decodeLog - Handled by the Web3.js library itself. No RPC Call
}

function web3_js_test_net() {
    /**
     * web3.*.net
     */
    // getId
    net_version({jsonrpc: "2.0", method: "net_version", params: []});
    // isListening
    net_listening({jsonrpc: "2.0", method: "net_listening", params: []});
    // getPeerCount
    net_peerCount({jsonrpc: "2.0", method: "net_peerCount", params: []});
}

function web3_js_test_bzz() {
    /**
     * web3.bzz - Swarm: https://swarm-guide.readthedocs.io/en/latest/
     */
    // setProvider - Under construction
    // givenProvider - Under construction
    // currentProvider - Under construction
    // upload - Under construction
    // download - Under construction
    // pick - Under construction
}

function web3_js_test_shh() {
    /**
     * web3.shh - Whisper protocol: https://github.com/ethereum/go-ethereum/wiki/Whisper
     */
    // setProvider - Under construction
    // providers - Under construction
    // givenProvider - Under construction
    // currentProvider - Under construction
    // BatchRequest - Under construction
    // extend - Under construction
    // getId - Under construction
    // isListening - Under construction
    // getPeerCount - Under construction
    // getVersion - Under construction
    // getInfo - Under construction
    // setMaxMessageSize - Under construction
    // setMinPoW - Under construction
    // markTrustedPeer - Under construction
    // newKeyPair - Under construction
    // addPrivateKey - Under construction
    // deleteKeyPair - Under construction
    // hasKeyPair - Under construction
    // getPublicKey - Under construction
    // getPrivateKey - Under construction
    // newSymKey - Under construction
    // addSymKey - Under construction
    // generateSymKeyFromPassword - Under construction
    // hasSymKey - Under construction
    // getSymKey - Under construction
    // deleteSymKey - Under construction
    // post - Under construction
    // subscribe - Under construction
    // clearSubscriptions - Under construction
    // newMessageFilter - Under construction
    // deleteMessageFilter - Under construction
    // getFilterMessages - Under construction
}

function web3_js_test_utils() {
    /**
     * web3.utils
     */
    // randomHex - Handled by the Web3.js library itself. No RPC Call
    // _ - Handled by the Web3.js library itself. No RPC Call
    // BN - Handled by the Web3.js library itself. No RPC Call
    // isBN - Handled by the Web3.js library itself. No RPC Call
    // isBigNumber - Handled by the Web3.js library itself. No RPC Call
    // sha3 - Handled by the Web3.js library itself. No RPC Call
    // soliditySha3 - Handled by the Web3.js library itself. No RPC Call
    // isHex - Handled by the Web3.js library itself. No RPC Call
    // isHexStrict - Handled by the Web3.js library itself. No RPC Call
    // isAddress - Handled by the Web3.js library itself. No RPC Call
    // toChecksumAddress - Handled by the Web3.js library itself. No RPC Call
    // checkAddressChecksum - Handled by the Web3.js library itself. No RPC Call
    // toHex - Handled by the Web3.js library itself. No RPC Call
    // toBN - Handled by the Web3.js library itself. No RPC Call
    // hexToNumberString - Handled by the Web3.js library itself. No RPC Call
    // hexToNumber - Handled by the Web3.js library itself. No RPC Call
    // numberToHex - Handled by the Web3.js library itself. No RPC Call
    // hexToUtf8 - Handled by the Web3.js library itself. No RPC Call
    // hexToAscii - Handled by the Web3.js library itself. No RPC Call
    // utf8ToHex - Handled by the Web3.js library itself. No RPC Call
    // asciiToHex - Handled by the Web3.js library itself. No RPC Call
    // hexToBytes - Handled by the Web3.js library itself. No RPC Call
    // bytesToHex - Handled by the Web3.js library itself. No RPC Call
    // toWei - Handled by the Web3.js library itself. No RPC Call
    // fromWei - Handled by the Web3.js library itself. No RPC Call
    // unitMap - Handled by the Web3.js library itself. No RPC Call
    // padLeft - Handled by the Web3.js library itself. No RPC Call
    // padRight - Handled by the Web3.js library itself. No RPC Call
    // toTwosComplement - Handled by the Web3.js library itself. No RPC Call
}

function resetFields() {
    amountOfCalls = 0;
    $('.succeededcalls').text(0);
    $('.failedcalls').text(0);
    $('.totalcalls').text(0);

    $(".web3-contract-1").empty();
    $(".web3-contract-2").empty();
    $(".web3-contract-3").empty();
    $(".web3-contract-4").empty();

    $(".web3-eth-1").empty();
    $(".web3-eth-2").empty();
    $(".web3-eth-3").empty();
    $(".web3-eth-4").empty();
    $(".web3-eth-5").empty();
    $(".web3-eth-6").empty();
    $(".web3-eth-7").empty();
    $(".web3-eth-8").empty();
    $(".web3-eth-9").empty();
    $(".web3-eth-10").empty();
    $(".web3-eth-11").empty();
    $(".web3-eth-12").empty();
    $(".web3-eth-13").empty();
    $(".web3-eth-14").empty();
    $(".web3-eth-15").empty();
    $(".web3-eth-16").empty();
    $(".web3-eth-17").empty();
    $(".web3-eth-18").empty();
    $(".web3-eth-19").empty();
    $(".web3-eth-20").empty();
    $(".web3-eth-21").empty();
    $(".web3-eth-22").empty();


    $(".web3-personal-1").empty();
    $(".web3-personal-2").empty();


    $(".web3-net-1").empty();
    $(".web3-net-2").empty();
    $(".web3-net-3").empty();
}