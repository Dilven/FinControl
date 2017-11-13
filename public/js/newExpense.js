var element = document.getElementById('addExpense');

if (element != null) {
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
        var formData = {};

        $('.add_expense_field').each(function (index, element) {
          formData[element.name] = element.value
        });

        return axios.post('/expenses/add', formData)
          .then(function(response) {
              var data = {
                message: response.data.message,
                timeout: 4000,
                actionHandler: handler,
                actionText: 'Cofnij'
              };
              snackbarContainer.MaterialSnackbar.showSnackbar(data);
              dialog.close();
          })
          .catch(function () {
            var data = {
              message: 'Błąd dodawania transakcji. Spróbuj jeszcze raz.',
              timeout: 4000,
              actionHandler: handler,
              actionText: 'Cofnij'
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
          });
    
            

        // 'use strict';
        // //acceptExpenseButton.style.backgroundColor = '#' +
        //   //  Math.floor(Math.random() * 0xFFFFFF).toString(16);
        
        
      });
    }());
    
}

