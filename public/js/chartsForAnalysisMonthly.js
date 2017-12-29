function getDataForCategoriesExpensesMonthly(response) {   
    var ctx = document.getElementById("categories-expenses-monthly").getContext('2d'),
         data = [],
         labels = [];
         var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
     var categoriesForChart = response.data.categoriesForChart;
     ctx.canvas.width = 235;
     ctx.canvas.height = 220;
     if (categoriesForChart.length === 0) {
         ctx.font = "30px Arial";
         ctx.fillText("No data",50,100);
         return null;
     }
     categoriesForChart.forEach(function (cat) {
         data.push(cat.amountActiveMonth);
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
         title: {
            display: true,
            text: 'Wydane kwoty w danych kategoriach'
            },
     }
     var myCategoriesChart = new Chart(ctx,{
         type: 'doughnut',
         data: data,
         options: options
     });
}

function getDataForExpensesLineChartMonthly(response) {
    
    var date = new Date(),
        month = date.getMonth(),
        numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    var expense = response.data.AllExpensesForDay,
        budgetForDay = response.data.budgetMonthsForChart[month]/numberOfDays;
        budgetForDayDisplay =  new Array(numberOfDays).fill(budgetForDay.toFixed(2)); 
    const days = [];

    for (var i = 1; i <= numberOfDays; i++) {
        days[i] = i;
    }
    

    var data = {
        datasets: [{
            data: expense,
            label: 'Wydatki',
            borderColor: '#DC3912',
            fill: false,
            backgroundColor: '#DC3912'

            
        }, {
            data: budgetForDayDisplay,
            label:'Budżet na dany dzień',
            borderColor: '#3B3EAC',
            fill: false,
            backgroundColor: '#3B3EAC'

            
        }],
        labels: days,
    }

    var  scales = {
        xAxes: [{
            ticks: {
                autoSkip: false
            }
        }]
    };

    var options = {
        scales: scales,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
        padding:0,

        title: {
            display: true,
            text: 'Wydatki w tym miesiącu'
            }
            
        
    }
    var ctx = document.getElementById("expenses-for-day").getContext('2d');
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    
    var img = new Image();
    img.src = "../images/noDataForChart.png";

    if (expense.length === 0) {
        var width = ctx.canvas.width = 532,
            height = ctx.canvas.height = 500;
        img.onload = function(){
            ctx.drawImage(img, 0,0,width,height);
          }
        return null;
    }

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });
};

function getDataToSpendAndExpensesAmount(response) {   
    var ctx = document.getElementById("expense-amount-tospend-chart-analysis-month").getContext('2d'),
        data = [],
        labels = [],
        date = new Date(),
        month = date.getMonth();
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    var budgetForMonth = response.data.budgetMonthsForChart[month],
        expenseForMonth = response.data.AllExpensesForMonth[month].toFixed(2),
        toSpendAmount = (budgetForMonth - expenseForMonth).toFixed(2);

    var dataForChart = [];
    
    dataForChart.push(expenseForMonth);
    dataForChart.push(toSpendAmount);

    ctx.canvas.width = 235;
    ctx.canvas.height = 220;



    var data = {
        datasets: [{
            data: dataForChart,
            backgroundColor: default_colors
        }],
        labels: ['Wydano', 'Pozostała kwota'],
    };

    var options = {
        responsive: true,
        title: {
        display: true,
        text: 'Ilość wydatków i pozostała kwota'
        },
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDataBudgetedAndExpensesCategoryMonth(response) {

    var budgetMonthsCategoryForChart = response.data.budgetMonthsCategoryForChart;

    var ctx = document.getElementById("budgeted-expenses-category-month").getContext('2d');
    
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;
        expense = [],
        labels = [],
        categoryBudgets = [],
        categoriesForChart = [];
    response.data.categoriesForChart.forEach(function(cat) {
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
                backgroundColor: '#DC3912',
                }, {
                data: categoryBudgets,
                label: 'Zabudzetowana kwota',
                backgroundColor: '#3366CC'
                }
            ],
        labels: labels
        };
    
    var scales = {
        xAxes: [{
            ticks: {
                autoSkip: false
            }
        }]
    }
    var options = {
        scales: scales,
        responsive: true,
        title: {
            display: true,
            text: 'Zabudżetowana kwota w stosunku do wydatków',
            },
        
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
    getDataBudgetedAndExpensesCategoryMonth(response);
    getDataForExpensesLineChartMonthly(response);
    getDataToSpendAndExpensesAmount(response);
})
.catch(function (error) {
    console.log(error);
});
