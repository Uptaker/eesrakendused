$(document).ready(function () {
    $('img').css({
        'width': '20vw'
    });

    let firstPic = $('img.active').prop('src');
    let test = document.querySelector('.active');
    test = test.src;

    $('.big-image').html(`<img src="${firstPic}">`);


    $('#prev').click(prevPic);
    $('#hide').click(hidePic);
    $('#next').click(nextPic)
    $(document).keydown(keyPress);

    $('#picContainer img').click(function () {
        let currentPic = $('img.active');
        let selectedPic = $(this);
        swapActive(currentPic, selectedPic);
    });

    function swapActive(currentPic, selectedPic) {
        currentPic.removeClass('active');
        selectedPic.addClass('active');

        $('.big-image').html(`<img src="${selectedPic.prop('src')}">`).hide().fadeIn(200);
        $('.big-image img').css({
            'width': '90vw'
        });
    }

    function keyPress(e) {
        console.log(e.keyCode);
        if (e.keyCode == 39) {
            nextPic();
        }
        if (e.keyCode == 37) {
            prevPic();
        }
        if (e.keyCode == 72) {
            hidePic();
        }
    }

    function hidePic() {
        // $('.big-image-container').fadeOut(500);
        // $('.big-image-container').slideUp('fast')  slideDown()
        $('.big-image-container').fadeToggle();
        if ($('#hide').html() == "Peida") {
            $('#hide').html("Näita");
        } else {
            $('#hide').html("Peida");
        }
    }

    function nextPic() {
        let currentPic = $('img.active');
        let selectedPic = currentPic.next();

        if (selectedPic.length == 0) {
            selectedPic = $('#picContainer img').siblings().first();
        }
        swapActive(currentPic, selectedPic);
    }

    function prevPic() {
        let currentPic = $('img.active');
        let selectedPic = currentPic.prev();

        if (selectedPic.length == 0) {
            selectedPic = $('#picContainer img').siblings().last();
        }
        swapActive(currentPic, selectedPic);
    }



});