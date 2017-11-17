$( document ).ready(function() {
    
    var dialog = new mdDateTimePicker.default({
        type: 'date'
    });
    console.log(dialog);
    var toggleButton = document.getElementById('dataPicker');
    toggleButton.addEventListener('click', function() {
        dialog.toggle();
    });
    
});