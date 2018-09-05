function eth_protocolVersion(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-1", 1, "eth_protocolVersion", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, false, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getprotocolversion");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-1", 1, "eth_protocolVersion", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, false, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getprotocolversion");
            }
        }
    });
}

function eth_syncing(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-2", 2, "eth_syncing", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a boolean";
                if (typeof(data.result) === 'boolean') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a boolean";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-2", 2, "eth_syncing", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing");
            }
        }
    });
}

function eth_coinbase(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-3", 3, "eth_coinbase", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getcoinbase");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string and 42 characters";
                if (typeof(data.result) === 'string' && byteCount(data.result) === 42) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string and 42 characters";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-3", 3, "eth_coinbase", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getcoinbase");
            }
        }
    });
}

function eth_mining(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-4", 4, "eth_mining", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#ismining");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a boolean";
                if (typeof(data.result) === 'boolean') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a boolean";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-4", 4, "eth_mining", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#ismining");
            }
        }
    });
}

function eth_hashrate(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-5", 5, "eth_hashrate", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gethashrate");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a hexadecimal";
                if (web3.utils.isHex(data.result)) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a hexadecimal";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-5", 5, "eth_hashrate", syntaxHighlight(dataReq), data.result + " (" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gethashrate");
            }
        }
    });
}

function eth_gasPrice(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-6", 6, "eth_gasPrice", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getgasprice");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-6", 6, "eth_gasPrice", syntaxHighlight(dataReq), data.result + " (" + web3.extend.formatters.outputBigNumberFormatter(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getgasprice");
            }
        }
    });
}

function eth_accounts(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-7", 7, "eth_accounts", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getaccounts");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be an array";
                if (Array.isArray(data.result)) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof an array";
                    data.result = formatArrayToReadable(data.result);
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-7", 7, "eth_accounts", syntaxHighlight(dataReq), "[" + data.result + "]", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getaccounts");
            }
        }
    });
}

function eth_blockNumber(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-8", 8, "eth_blockNumber", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblocknumber");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a hex";
                if (web3.utils.isHex(data.result)) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a hex";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-8", 8, "eth_blockNumber", syntaxHighlight(dataReq), data.result + " (" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblocknumber");
            }
        }
    });
}

function eth_getBalance(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-9", 9, "eth_getBalance" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getbalance");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-9", 9, "eth_getBalance" + extraInfo, syntaxHighlight(dataReq), data.result + " (" + web3.extend.formatters.outputBigNumberFormatter(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getbalance");
            }
        }
    });
}

function eth_getStorageAt(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-10", 10, "eth_getStorageAt" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getstorageat");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-10", 10, "getStorageAt" + extraInfo, syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getstorageat");
            }
        }
    });
}

function eth_getCode(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-11", 11, "eth_getCode" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getcode");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-11", 11, "eth_getCode" + extraInfo, syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getcode");
            }
        }
    });
}

function eth_getBlockByNumber(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-12", 12, "eth_getBlockByNumber" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock");
            } else {
                let responseSucces = false;
                let responseMessage = [];
                let faultyObjectKeyValues = [];
                if (typeof(data.result) === 'object') {
                    responseSucces = true;
                    responseMessage = [];
                    responseMessage.push("- Response is instanceof an object <br>");
                } else {
                    responseMessage.push("- Expected result to be an object <br>");
                }
                let keysToCheck = [];
                keysToCheck.push({key: "number", type: "string"});
                keysToCheck.push({key: "hash", type: "string"});
                keysToCheck.push({key: "parentHash", type: "string"});
                keysToCheck.push({key: "nonce", type: "string"});
                keysToCheck.push({key: "sha3Uncles", type: "string"});
                keysToCheck.push({key: "logsBloom", type: "string"});
                keysToCheck.push({key: "transactionsRoot", type: "string"});
                keysToCheck.push({key: "stateRoot", type: "string"});
                keysToCheck.push({key: "miner", type: "string"});
                keysToCheck.push({key: "difficulty", type: "string"});
                keysToCheck.push({key: "totalDifficulty", type: "string"});
                keysToCheck.push({key: "extraData", type: "string"});
                keysToCheck.push({key: "size", type: "string"});
                keysToCheck.push({key: "gasLimit", type: "string"});
                keysToCheck.push({key: "gasUsed", type: "string"});
                keysToCheck.push({key: "timestamp", type: "string"});
                keysToCheck.push({key: "transactions", type: "array"});
                keysToCheck.push({key: "uncles", type: "array"});
                let result = validateObjectKeyValues(data.result, keysToCheck);
                if (result.success) {
                    responseMessage = responseMessage.concat(result.results);
                } else {
                    faultyObjectKeyValues = faultyObjectKeyValues.concat(result.results);
                }
                if (faultyObjectKeyValues.length > 0) {
                    incrementFailedCalls();
                    addContentToCard(".web3-eth-12", 12, "eth_getBlockByNumber" + extraInfo, syntaxHighlight(dataReq), syntaxHighlight(data.result), faultyObjectKeyValues.join(""), true, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock");
                } else {
                    if (responseSucces) {
                        incrementSucceededCalls();
                    }
                    addContentToCard(".web3-eth-12", 12, "eth_getBlockByNumber" + extraInfo, syntaxHighlight(dataReq), syntaxHighlight(data.result), responseMessage.join(""), true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock");
                }
            }
        }
    });
}

function eth_getBlockTransactionCountByNumber(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-13", 13, "eth_getBlockTransactionCountByNumber" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblocktransactioncount");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a number";
                if (typeof(data.result) === 'number') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a number";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-13", 13, "eth_getBlockTransactionCountByNumber" + extraInfo, syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblocktransactioncount");
            }
        }
    });
}

function eth_getTransactionByBlockNumberAndIndex(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-15", 15, "eth_getTransactionByBlockNumberAndIndex" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionfromblock");
            } else {
                let responseSucces = false;
                let responseMessage = [];
                let faultyObjectKeyValues = [];
                if (typeof(data.result) === 'object') {
                    responseSucces = true;
                    responseMessage = [];
                    responseMessage.push("- Response is instanceof an object <br>");
                } else {
                    responseMessage.push("- Expected result to be an object <br>");
                }
                let keysToCheck = [];
                keysToCheck.push({key: "blockHash", type: "string"});
                keysToCheck.push({key: "blockNumber", type: "string"});
                keysToCheck.push({key: "from", type: "string"});
                keysToCheck.push({key: "gas", type: "string"});
                keysToCheck.push({key: "gasPrice", type: "string"});
                keysToCheck.push({key: "hash", type: "string"});
                keysToCheck.push({key: "input", type: "string"});
                keysToCheck.push({key: "nonce", type: "string"});
                keysToCheck.push({key: "to", type: "string"});
                keysToCheck.push({key: "transactionIndex", type: "string"});
                keysToCheck.push({key: "value", type: "string"});
                let result = validateObjectKeyValues(data.result, keysToCheck);
                if (result.success) {
                    responseMessage = responseMessage.concat(result.results);
                } else {
                    faultyObjectKeyValues = faultyObjectKeyValues.concat(result.results);
                }
                if (faultyObjectKeyValues.length > 0) {
                    incrementFailedCalls();
                    addContentToCard(".web3-eth-15", 15, "eth_getTransactionByBlockNumberAndIndex" + extraInfo, syntaxHighlight(dataReq), syntaxHighlight(data.result), faultyObjectKeyValues.join(""), true, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionfromblock");
                } else {
                    if (responseSucces) {
                        incrementSucceededCalls();
                    }
                    addContentToCard(".web3-eth-15", 15, "eth_getTransactionByBlockNumberAndIndex" + extraInfo, syntaxHighlight(dataReq), syntaxHighlight(data.result), responseMessage.join(""), true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionfromblock");
                }
            }
        }
    });
}

function eth_getTransactionCount(dataReq, extraInfo) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-16", 16, "eth_getTransactionCount" + extraInfo, syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactioncount");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-16", 16, "eth_getTransactionCount" + extraInfo, syntaxHighlight(dataReq), data.result + " (" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactioncount");
            }
        }
    });
}

function eth_sendTransaction(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-17", 17, "eth_sendTransaction", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction");
            } else {
                let hash = data.result;
                let responseSucces = false;
                let responseMessage = "Expected result to be a string and 66 characters";
                if (typeof(hash) === 'string' && byteCount(hash) === 66) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string and 66 characters";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-17", 17, "eth_sendTransaction", syntaxHighlight(dataReq), hash, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction");
                eth_getTransactionByHash(hash);
                eth_getTransactionReceipt(hash);
            }
        }
    });
}

function eth_getTransactionByHash(hash) {
    incrementTotalCalls();
    let dataTransactionHash = json_stringify_data({"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":[hash]});
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataTransactionHash,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-14", 14, "eth_getTransactionByHash", syntaxHighlight(dataTransactionHash), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransaction");
            } else {
                let responseSucces = false;
                let responseMessage = [];
                let faultyObjectKeyValues = [];
                if (typeof(data.result) === 'object') {
                    responseSucces = true;
                    responseMessage = [];
                    responseMessage.push("- Response is instanceof an object <br>");
                } else {
                    responseMessage.push("- Expected result to be an object <br>");
                }
                let keysToCheck = [];
                keysToCheck.push({key: "hash", type: "string"});
                keysToCheck.push({key: "nonce", type: "string"});
                keysToCheck.push({key: "blockHash", type: "string"});
                keysToCheck.push({key: "blockNumber", type: "string"});
                keysToCheck.push({key: "transactionIndex", type: "string"});
                keysToCheck.push({key: "from", type: "string"});
                keysToCheck.push({key: "to", type: "string"});
                keysToCheck.push({key: "value", type: "string"});
                keysToCheck.push({key: "gasPrice", type: "string"});
                keysToCheck.push({key: "gas", type: "string"});
                keysToCheck.push({key: "input", type: "string"});
                let result = validateObjectKeyValues(data.result, keysToCheck);
                if (result.success) {
                    responseMessage = responseMessage.concat(result.results);
                } else {
                    faultyObjectKeyValues = faultyObjectKeyValues.concat(result.results);
                }
                if (faultyObjectKeyValues.length > 0) {
                    incrementFailedCalls();
                    addContentToCard(".web3-eth-14", 14, "eth_getTransactionByHash", syntaxHighlight(dataTransactionHash), syntaxHighlight(data.result), faultyObjectKeyValues.join(""), true, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransaction");
                } else {
                    if (responseSucces) {
                        incrementSucceededCalls();
                    }
                    addContentToCard(".web3-eth-14", 14, "eth_getTransactionByHash", syntaxHighlight(dataTransactionHash), syntaxHighlight(data.result), responseMessage.join(""), true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransaction");
                }
            }
        }
    });
}

function eth_getTransactionReceipt(hash) {
    incrementTotalCalls();
    let dataReceipt = json_stringify_data({"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":[hash]});           
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReceipt,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-18", 18, "eth_getTransactionReceipt", syntaxHighlight(dataReceipt), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt");
            } else {
                let responseSucces = false;
                let responseMessage = [];
                let faultyObjectKeyValues = [];
                if (typeof(data.result) === 'object') {
                    responseSucces = true;
                    responseMessage = [];
                    responseMessage.push("- Response is instanceof an object <br>");
                } else {
                    responseMessage.push("- Expected result to be an object <br>");
                }
                let keysToCheck = [];
                keysToCheck.push({key: "status", type: "string"});
                keysToCheck.push({key: "blockHash", type: "string"});
                keysToCheck.push({key: "blockNumber", type: "string"});
                keysToCheck.push({key: "transactionHash", type: "string"});
                keysToCheck.push({key: "transactionIndex", type: "string"});
                if (data.result.hasOwnProperty("from")) {
                    keysToCheck.push({key: "from", type: "string"});
                }
                if (data.result.hasOwnProperty("to")) {
                    keysToCheck.push({key: "to", type: "string"});
                }
                if (data.result.contractAddress !== null) {
                    keysToCheck.push({key: "contractAddress", type: "string"});
                }
                keysToCheck.push({key: "cumulativeGasUsed", type: "string"});
                keysToCheck.push({key: "gasUsed", type: "string"});
                keysToCheck.push({key: "logs", type: "array"});
                let result = validateObjectKeyValues(data.result, keysToCheck);
                if (result.success) {
                    responseMessage = responseMessage.concat(result.results);
                } else {
                    faultyObjectKeyValues = faultyObjectKeyValues.concat(result.results);
                }
                if (faultyObjectKeyValues.length > 0) {
                    incrementFailedCalls();
                    addContentToCard(".web3-eth-18", 18, "eth_getTransactionReceipt", syntaxHighlight(dataReceipt), syntaxHighlight(data.result), faultyObjectKeyValues.join(""), true, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt");
                } else {
                    if (responseSucces) {
                        incrementSucceededCalls();
                    }
                    addContentToCard(".web3-eth-18", 18, "eth_getTransactionReceipt", syntaxHighlight(dataReceipt), syntaxHighlight(web3.extend.formatters.outputTransactionReceiptFormatter(data.result)), responseMessage.join(""), true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt");
                }
            }
        }
    });
}

function eth_sign(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-19", 19, "eth_sign", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sign");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-19", 19, "eth_sign", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sign");
            }
        }
    });
}

function eth_call(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-20", 20, "eth_call", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a string";
                if (typeof(data.result) === 'string') {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a string";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-20", 20, "eth_call", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
            }
        }
    });
}

function eth_estimateGas(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-21", 21, "eth_estimateGas", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#estimategas");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be a hexadecimal";
                if (web3.utils.isHex(data.result)) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof a hexadecimal";
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-21", 21, "eth_estimateGas", syntaxHighlight(dataReq), data.result + " (" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#estimategas");
            }
        }
    });
}

function eth_getLogs(dataReq) {
    incrementTotalCalls();
    dataReq = json_stringify_data(dataReq);
    $.ajax({
        type: "POST",
        url: nodeUrl,
        dataType: "json",
        contentType: "application/json",
        data: dataReq,
        success: (data) => {
            if (data.error) {
                console.log(data);
                incrementFailedCalls();
                addContentToCard(".web3-eth-22", 22, "eth_getLogs", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getpastlogs");
            } else {
                let responseSucces = false;
                let responseMessage = "Expected result to be an array";
                if (Array.isArray(data.result)) {
                    responseSucces = true;
                    responseMessage = "Response is instanceof an array";
                    data.result = formatArrayToReadable(data.result);
                    incrementSucceededCalls();
                } else {
                    incrementFailedCalls();
                }
                addContentToCard(".web3-eth-22", 22, "eth_getLogs", syntaxHighlight(dataReq), "[" + data.result + "]", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#getpastlogs");
            }
        }
    });
}