$(document).ready(function() {
    // Set background image
    setBackgroundImage();
    // Set date
    setToday();

    // Initialize summernote
    $('#summernote').summernote({
    });

    postData();

    // Set editor's size
    setElementHeight(".note-editing-area", getHeightByWindow());

    // Add custom background div
    $(".frosted-glass").appendTo(".note-editing-area");

    // Move editor above background div
    $(".note-editable").appendTo(".note-editing-area");

    // Remove the manual resize option
    $(".note-statusbar").remove();
});

$(window).resize(function(){
    // Set editor's size again on resize
    setElementHeight(".note-editing-area", getHeightByWindow());
});

function getHeightByWindow() {
    return $(document).height() - 273;
}

function setBackgroundImage() {
    $.get("/getBackgrounds", function(data){
        var urls = JSON.parse(data).backgrounds;
        var url = urls[Math.floor(Math.random()*urls.length+1)];
        $("html").css({'background': 'url(' + url + ') no-repeat center center fixed', 
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
        });
    });
}

function setToday() {
    $("#today").text(Date.create().format('{Month} {d}, {yyyy}'));
}

function setElementHeight(element, size) {
    $(element).height(size);
}

function postData(){
    // POST 
    // Since this deals with backend and the rest is strictly front end, consider moving to another file?
    // Nah prob not
}

function getData(){
    // GET
    // Since this deals with backend and the rest is strictly front end, consider moving to another file?
    // Nah prob not
}
