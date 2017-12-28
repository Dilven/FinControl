function getDataForCategoriesExpensesMonthly(response) {
    var ctx = document.getElementById("categories-expenses-monthly").getContext('2d'),
         data = [],
         labels = [];
         var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
     var categoriesForChart = response.data.categoriesForChartMonthly;
     if (categoriesForChart.length === 0) {
         ctx.font = "30px Arial";
         ctx.fillText("No data",50,100);
         return null;
     }
     categoriesForChart.forEach(function (cat) {
         data.push(cat.amount);
         labels.push(cat.name);
     })

   
     var data = {
         datasets: [{
             data: data,
             backgroundColor: default_colors
         }],
         labels: labels
     };

     var options = {
         responsive: true,
     }
     var myCategoriesChart = new Chart(ctx,{
         type: 'doughnut',
         data: data,
         options: options
     });
}
function getDataForCategoriesChart2(response) {

 var budgetMonthsCategoryForChart = response.data.budgetMonthsCategoryForChart;

 var ctx = document.getElementById("categoriesChart2").getContext('2d');
     expense = [],
     labels = [],
     categoryBudgets = [],
     categoriesForChart = [];
 response.data.categoriesForChartMonthly.forEach(function(cat) {
     if (cat.amountActiveMonth > 0)
         categoriesForChart.push(cat);
 });

 if (categoriesForChart.length === 0) {
     ctx.font = "30px Arial";
     ctx.fillText("No data",50,100);
     return null;
 }

 categoriesForChart.forEach(function (cat) {
     
     expense.push(cat.amountActiveMonth);
     labels.push(cat.name);
     var budget = budgetMonthsCategoryForChart.find(function (o) { return o.categoryId === cat.id; })
     categoryBudgets.push(budget ? budget.amount : 0);
 })
 
 var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
 
     data = {
         datasets: [{
             data: expense,
             label: 'Wydano',
             backgroundColor: default_colors,
         }, {
             data: categoryBudgets,
             label: 'Zabudzetowana kwota',
             backgroundColor: default_colors
         }
         ],
     labels: labels
     };
 

 var options = {
     responsive: true,
 }
 var myBarChart = new Chart(ctx, {
     type: 'bar',
     data: data,
     options: options
 });
}


axios.get('/api/charts/analysis')
.then(function (response) {
    getDataForCategoriesExpensesMonthly(response);
    getDataForCategoriesChart2(response);
})
.catch(function (error) {
    console.log(error);
});
