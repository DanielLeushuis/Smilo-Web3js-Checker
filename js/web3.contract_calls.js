function contractGetCandidateList(dataReq) {
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
                addContentToCard(".web3-contract-1", 1, "getCandidateList() - eth_call", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, false, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
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
                addContentToCard(".web3-contract-1", 1, "getCandidateList() - eth_call", syntaxHighlight(dataReq), data.result + " <br><br>(" + web3.utils.hexToUtf8(data.result) + " )", responseMessage, true, responseSucces, false, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
            }
        }
    });
}

function isValidCandidate(dataReq) {
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
                addContentToCard(".web3-contract-2", 2, "validCandidate() - eth_call", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
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
                addContentToCard(".web3-contract-2", 2, "validCandidate() - eth_call", syntaxHighlight(dataReq), data.result + " <br><br>(" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
            }
        }
    });
}

function voteForCandidate(dataReq) {
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
                addContentToCard(".web3-contract-3", 3, "voteForCandidate() - eth_sendTransaction", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction");
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
                addContentToCard(".web3-contract-3", 3, "voteForCandidate() - eth_sendTransaction", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction");
            }
        }
    });
}

function totalVotesFor(dataReq) {
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
                addContentToCard(".web3-contract-4", 4, "totalVotesFor() - eth_call", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
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
                addContentToCard(".web3-contract-4", 4, "totalVotesFor() - eth_call", syntaxHighlight(dataReq), data.result + " <br><br>(" + web3.utils.hexToNumber(data.result) + ")", responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth.html#call");
            }
        }
    });
}