$(document).ready(() => {
   $('.table-icon-delete').click(function() {
        var transactionToDeleted = {},
            rowInTable = $(this).closest('tr'),
            snackbarContainer = document.querySelector('#notificationBar'),
            data = {};
    
        data.id = $(rowInTable).attr('data');

        rowInTable.css("display", "none");
        
        return axios.post('/transactions/delete', data)
        .then(function(response) {
        })
    });
})