$(document).ready(() => {
    var presentUrl = location.href.toString(),
        presentQuery = parseInt(presentUrl.substring(presentUrl.indexOf("=") + 1)),
        element = $("tbody");

    if(isNaN(presentQuery)) {
        $('#newer-transaction').hide();
    } else {
        $('#newer-transaction').show();
    }
    
    if(element.length < 9) {
        $('#older-transaction').hide();
    } else {
        $('#older-transaction').show();
    }
    
    $('#older-transaction').click(function() {
        
        if(isNaN(presentQuery)) {
          var newUrl = presentUrl + '?page=2'
          window.location.href= newUrl;
        } else {
          nextQuery = presentQuery + 1;
          nextQuery = nextQuery.toString()
          var newUrl = presentUrl.slice(0, -1) + nextQuery;
          window.location.href= newUrl;
        }
    });
    $('#newer-transaction').click(function() {
        
        if(presentQuery !== 2) {
            nextQuery = presentQuery - 1;
            nextQuery = nextQuery.toString()
       
            var newUrl = presentUrl.slice(0, -1) + nextQuery;
            window.location.href= newUrl;
        } else { 
        newUrl = presentUrl.split('?'[0]);
        newUrl = newUrl.slice(0, -1);
        window.location.href = newUrl; 
        }
    });
})
