function personal_newAccount_personal_unlockAccount(dataReq) {
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
                addContentToCard(".web3-personal-1", 1, "personal_newAccount", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, false, "https://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#newaccount");
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
                addContentToCard(".web3-personal-1", 1, "personal_newAccount", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, false, "https://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#newaccount");
                let unlockData = json_stringify_data({"jsonrpc":"2.0","method":"personal_unlockAccount","params":[data.result,"ninjasinpajamas",600]});
                incrementTotalCalls();
                // unlockAccount
                $.ajax({
                    type: "POST",
                    url: nodeUrl,
                    dataType: "json",
                    contentType: "application/json",
                    data: unlockData,
                    success: (data) => {
                        if (data.error) {
                            console.log(data);
                            incrementFailedCalls();
                            addContentToCard(".web3-personal-2", 2, "personal_unlockAccount", syntaxHighlight(dataReq), JSON.stringify(data.error), JSON.stringify(data.error), false, false, true, "https://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#unlockaccount");
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
                            addContentToCard(".web3-personal-2", 2, "personal_unlockAccount", syntaxHighlight(dataReq), data.result, responseMessage, true, responseSucces, true, "https://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#unlockaccount");
                        }
                    }
                });
            }
        }
    });
}