function net_version(dataReq) {
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
                addContentToCard(".web3-net-1", 1, "net_version", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, false, "https://web3js.readthedocs.io/en/1.0/web3-net.html#getid");
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
                addContentToCard(".web3-net-1", 1, "net_version", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, false, "https://web3js.readthedocs.io/en/1.0/web3-net.html#getid");
            }
        }
    });
}

function net_listening(dataReq) {
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
                addContentToCard(".web3-net-2", 2, "net_listening", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-net.html#islistening");
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
                addContentToCard(".web3-net-2", 2, "net_listening", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-net.html#islistening");
            }
        }
    });
}

function net_peerCount(dataReq) {
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
                addContentToCard(".web3-net-3", 3, "net_peerCount", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-net.html#getpeercount");
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
                addContentToCard(".web3-net-3", 3, "net_peerCount", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-net.html#getpeercount");
            }
        }
    });
}