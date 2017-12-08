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
           
            $('#dataPicker-label').css({
                color: '#3f51b5',
                fontSize: '12px',
                top: '4px',
                visibility: 'visible'
            });
            

        });
    });
    
     $('#mddtp-picker__date').appendTo('#dialogTransaction')

    
});
    
   
    
