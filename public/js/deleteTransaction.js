$(document).ready(() => {
   $('.table-icon-delete').click(function() {
        var transactionToDeleted = {},
            rowInTable = $(this).closest('tr'),
            snackbarContainer = document.querySelector('#notificationBar');

        rowInTable.addClass( "is-selected" );
        
        $('.is-selected').find('td.transaction-data').each(function (index, element) {
            transactionToDeleted[($(this).attr('name'))] = element.innerText;
        });

        rowInTable.css("display", "none");
        
        return axios.post('/transactions/delete', transactionToDeleted)
        .then(function(response) {
            console.log(response);
        })
    });
})