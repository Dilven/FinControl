$( document ).ready(function() {
    var dialog = new mdDateTimePicker.default({
        type: 'date',
        modal: true
    });
    
    
    var dateInput = $('#dataPicker');
    
    dateInput.on('click', function() {
        dialog.toggle();
        $('#mddtp-date__ok').on('click', function() {
            
            dataPicker.value = dialog.time.format('MM/DD/YYYY');
           
            
            

        });
    });
    
     $('#mddtp-picker__date').appendTo('#dialogTransaction')

    
});
    
   
    
