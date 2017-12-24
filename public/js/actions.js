var acceptBudgetForCategoryButton = document.querySelector('#showBudgetForMonth');

acceptBudgetForCategoryButton.addEventListener('click', function() {
  var formData = {};

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
console.log(formData);

});
  
  