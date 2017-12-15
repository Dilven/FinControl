$(document).ready(function () {
    var addBudgetForm = document.getElementById('addBudgetForm');
        addBudgetCategoryForm = document.getElementById('addBudgetCategoryForm');
        
  
    if (addBudgetForm != null ) {
          
          (function() {
            'use strict';
            var snackbarContainer = document.querySelector('#notificationBar'),
                acceptBudgetButton = document.querySelector('#acceptBudget'),
                acceptBudgetForCategoryButton = document.querySelector('#acceptBudgetForCategory');
            var handlerBudget = function(event) {
                acceptBudgetButton.style.backgroundColor = '';
            };
            var handlerBudgetForCategory = function(event) {
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
                      actionHandler: handlerBudget,
                      actionText: 'Cofnij'
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                })
                .catch(function (err) {
                    console.log(err)
                  var data = {
                    message: 'Błąd dodawania transakcji. Spróbuj jeszcze raz.',
                    timeout: 4000,
                    actionHandler: handlerBudget,
                    actionText: 'Cofnij'
                  };
                  snackbarContainer.MaterialSnackbar.showSnackbar(data);
                });        
            });


            acceptBudgetForCategoryButton.addEventListener('click', function() {
              var formData = {};
    
              $('.category_field').each(function (index, element) {
                
                if (element.name === 'budgetMonthForCategory') {
                  formData[element.name] = $(element).attr('data-val');
                  
                } else {
                  formData[element.name] = element.value;
                  
                }
              });

              ;
              return axios.post('/actions/budgetcategories', formData)
                .then(function(response) {
                    var data = {
                      message: response.data.message,
                      timeout: 4000,
                      actionHandler: handlerBudgetForCategory,
                      actionText: 'Cofnij'
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                })
                .catch(function (err) {
                    console.log(err)
                  var data = {
                    message: 'Błąd dodawania transakcji. Spróbuj jeszcze raz.',
                    timeout: 4000,
                    actionHandler: handlerBudgetForCategory,
                    actionText: 'Cofnij'
                  };
                  snackbarContainer.MaterialSnackbar.showSnackbar(data);
                });        
            });
          }());
        
    }
  
})