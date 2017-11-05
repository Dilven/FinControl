r(function(){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = { message: '<%= message %>'};

    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

function r(f){ /in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
    