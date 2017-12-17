$(document).ready(() => {
  var element = document.getElementById('addExpense');

  if (element != null) {
      var dialog = document.querySelector('dialog');
      var showDialogButton = document.querySelector('#addExpense');

      axios.get('/categories')
      .then((response) => {
        response.data.forEach((cat) => {
          var listElement = $('<li>');
          listElement.addClass('mdl-menu__item');
          listElement.attr('data-val', cat.id);
          listElement.text(cat.name);
          $("#categories-dropdown").append(listElement);
          
        })

        getmdlSelect.init('#categories-dropdown-container')

        if (! dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
  
        showDialogButton.addEventListener('click', function() {
          dialog.showModal();
        })
  
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
              
              if (element.name === 'typeId' || element.name === 'categoryId') {
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
                  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  
                  $('.add_expense_field').each(function (index, element) {
                    $(element).val('');
                  });
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
          });
        }());
    
    });


      
  }

})