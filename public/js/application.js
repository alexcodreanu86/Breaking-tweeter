$(function() {
    var url = window.location.href;
    // var userName = (/\w\/(\w+)/).exec(url);

    function enter_pacman() {
        $('.container').html("<h1> Wait for it... Proccessing request </h1><div id='spinner'></div>");
    };

    $('form').on('submit', function(e) {
        e.preventDefault();
        data = $(this).serialize();
        enter_pacman()
        $.post('/tweet', data, function(response) {
            $(".container").html(response);
        })
    });



    // if (userName !== null) {
    //     enter_pacman();
    //     $.get('/' + userName[1], function(serverResponse) {
    //         $('.container').html(serverResponse);
    //     });
    // };


});
