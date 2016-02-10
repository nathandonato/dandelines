$(document).ready(function() {
    // Initialize summernote
    $('#summernote').summernote({
    });

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

function setElementHeight(element, size) {
    $(element).height(size);
}

function getHeightByWindow() {
    return $(document).height() - 273;
}
