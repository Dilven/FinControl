$( document ).ready(function() {
    var dialog = new mdDateTimePicker.default({
        type: 'date',
        modal:true
    });
    
    
    var toggleButton = document.getElementById('dataPicker');
    toggleButton.addEventListener('click', function() {
        dialog.toggle();
        
    });

  
});
    
   
    
