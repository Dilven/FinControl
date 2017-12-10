$(document).ready(function () {
    var element = document.getElementById('addBudgetForm');
  
    if (element != null) {
          
          (function() {
            'use strict';
            var snackbarContainer = document.querySelector('#notificationBar');
            var acceptBudgetButton = document.querySelector('#acceptBudget');
            var handler = function(event) {
                acceptBudgetButton.style.backgroundColor = '';
            };
            acceptBudgetButton.addEventListener('click', function() {
              var formData = {};
    
              $('.add_budget_field').each(function (index, element) {
                
                if (element.name === 'budgetMonth') {
                  formData[element.name] = $(element).attr('data-val');
                  
                } else {
                  formData[element.name] = element.value;
                  
                }
              });

              ;
              return axios.post('/actions/budget', formData)
                .then(function(response) {
                    var data = {
                      message: response.data.message,
                      timeout: 4000,
                      actionHandler: handler,
                      actionText: 'Cofnij'
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                })
                .catch(function (err) {
                    console.log(err)
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
        
    }
  
})