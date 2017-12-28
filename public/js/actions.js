$(document).ready(() => {
  var acceptBudgetForCategoryButton = document.querySelector('#showBudgetForMonth');
  
  acceptBudgetForCategoryButton.addEventListener('click', function() {
    var formData = {};
    const months = [
      {name: 'styczniu', value: 0},
      {name: 'lutym', value: 1},
      {name: 'marcu', value: 2},
      {name: 'kwietniu', value: 3},
      {name: 'maju', value: 4},
      {name: 'czerwcu', value: 5},
      {name: 'lipcu', value: 6},
      {name: 'sierpniu', value: 7},
      {name: 'wrzesieniu', value: 8},
      {name: 'październiku', value: 9},
      {name: 'listopadzie', value: 10},
      {name: 'grudniu', value: 11}
    ];
  
    $('.mdl-data-table-display-budgeted-category').find("tr.budgeted-display").each(function (index, element) {
      $(this).addClass('display-none');
    }); 
  
    $('.budgeted_month_for_display_field').each(function (index, element) {
      
      if (element.name === 'monthForDisplay') {
        formData[element.name] = $(element).attr('data-val');
        
      } else {
        formData[element.name] = element.value;
  
      }
    });

    $('.budgeted_year_for_display_field').each(function (index, element) {
      if (element.name === 'yearForDisplay') {
        formData[element.name] = $(element).attr('data-val');
        
      } else {
        formData[element.name] = element.value;    
    }
    });

    $('h4#budgeted-category').text('Zabudżetowane kategorie w ' + " " + months[formData.monthForDisplay].name + " " + formData.yearForDisplay);
      
    $('.mdl-data-table-display-budgeted-category').find("tr." + formData.yearForDisplay + "." + formData.monthForDisplay).each(function (index, element) {
      $(this).removeClass('display-none');
    });  
  
  });

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

        $('.category_budget_month_field').each(function (index, element) {
          
          if (element.name === 'budgetMonthForCategory') {
            formData[element.name] = $(element).attr('data-val');
            
          } else {
            formData[element.name] = element.value;
            
          }
        });
        $('.category_field').each(function (index, element) {
          
          if (element.name === 'category') {
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

  
  