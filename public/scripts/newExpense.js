(function() {
  'use strict';
  var snackbarContainer = document.querySelector('#demo-snackbar-example');
  var addExpenseButton = document.querySelector('#addExpense');
  var handler = function(event) {
    addExpenseButton.style.backgroundColor = '';
  };
  addExpenseButton.addEventListener('click', function() {
    'use strict';
    //addExpenseButton.style.backgroundColor = '#' +
      //  Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var data = {
      message: 'Dodano nowy wydatek.',
      timeout: 3000,
      actionHandler: handler,
      actionText: 'Cofnij'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
}());
