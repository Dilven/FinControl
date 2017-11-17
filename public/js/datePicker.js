

$( document ).ready(function() {
    console.log( "Milena!" );
    var dialog = new mdDateTimePicker.default({
        type: 'date'
    });
    
    var toggleButton = document.getElementById('dataPicker');
    toggleButton.addEventListener('click', function() {
        dialog.className += " dataPicker-zindex";
        console.log("Milena3")
        dialog.toggle();
    });
    
});