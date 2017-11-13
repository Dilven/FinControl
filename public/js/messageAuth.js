var snackbarContainer = document.getElementById('snackbar-auth');

if(snackbarContainer != null) {
    $( document ).ready(function() {
        var messageAuth = document.getElementById('message-auth').innerHTML;
        var data = { message: messageAuth};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
});
}

