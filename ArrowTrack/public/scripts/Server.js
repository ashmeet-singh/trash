var Server = {};

(function () {

    Server.send = function (F, X, C) {
        $.ajax({
            url: '/functions',
            type: 'POST',
            contentType: 'text/plain',
            data: JSON.stringify({ F: F, X: X }),
            dataType: 'text',
            success: function (XFromServer) {
                if (XFromServer !== 'Error!') {
                    C(JSON.parse(XFromServer));
                };
            }
        });
    };

})();
