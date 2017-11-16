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
          
          if (element.name === 'typeId') {
            formData[element.name] = $(element).data('val');
          } else {
            formData[element.name] = element.value;
          }
        });

        return axios.post('/transactions/add', formData)
          .then(function(response) {
              var data = {
                message: response.data.message,
                timeout: 4000,
                actionHandler: handler,
                actionText: 'Cofnij'
              };

              //var transaction = response.data.data;
              // console.log('heeeeeeeeeeeeeere', transaction)
              // $('<tr>' +
              //   '<td class="mdl-data-table__cell--non-numeric">' + transaction.name + '</td>' +
              //   '<td>' + new Data(transaction.transaction_date).toLocaleDateString() + '</td>' +
              //   '<td>' + transaction.amount +' zł</td>' +
              // '</tr>').appendTo('#myTable tbody');
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

