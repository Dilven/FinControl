
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#addExpense');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});


(function() {
  'use strict';
  var snackbarContainer = document.querySelector('#notificationBar');
  var acceptExpenseButton = document.querySelector('#acceptExpense');
  var handler = function(event) {
    acceptExpenseButton.style.backgroundColor = '';
  };
  acceptExpenseButton.addEventListener('click', function() {
    'use strict';
    //acceptExpenseButton.style.backgroundColor = '#' +
      //  Math.floor(Math.random() * 0xFFFFFF).toString(16);
    
    var data = {
      message: 'Dodano nowy wydatek.',
      timeout: 4000,
      actionHandler: handler,
      actionText: 'Cofnij'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    dialog.close();
  });
}());
