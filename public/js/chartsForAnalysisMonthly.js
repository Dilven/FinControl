function getDataForCategoriesExpensesMonthly(response) {   
    var ctx = document.getElementById("categories-expenses-monthly").getContext('2d'),
         data = [],
         labels = [];
         var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
     var categoriesExpensesForChart = response.data.categoriesExpensesForChart;
     ctx.canvas.width = 235;
     ctx.canvas.height = 220;
     
     categoriesExpensesForChart.forEach(function (cat) {
         data.push(cat.amountActiveMonth.toFixed(2));
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

    var expenses = [],
        budgetForDay = response.data.budgetMonthsForChart[month]/numberOfDays;
        budgetForDayDisplay =  new Array(numberOfDays).fill(budgetForDay.toFixed(2)); 
    const days = [];

    (response.data.AllExpensesForDay).forEach(function (expense) {
        expenses.push(expense.toFixed(2));
    })

    for (var i = 1; i <= numberOfDays; i++) {
        days[i] = i;
    }
    

    var data = {
        datasets: [{
            data: expenses,
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

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });
};

function getDataForIncomeLineChartMonthly(response) {
    
    var date = new Date(),
        month = date.getMonth(),
        numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    var allIncome = [];

    response.data.AllIncomeForDay.forEach(function(income) {
        allIncome.push(income.toFixed(2));
    })

    const days = [];

    for (var i = 1; i <= numberOfDays; i++) {
        days[i] = i;
    }
    

    var data = {
        datasets: [{
            data: allIncome,
            label: 'Przychody',
            borderColor: '#DC3912',
            fill: false,
            backgroundColor: '#DC3912'  
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
            text: 'Przychody w tym miesiącu'
            }
            
        
    }
    var ctx = document.getElementById("income-for-day").getContext('2d');
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });
};
function getDataBudgetedAndExpensesCategoryMonth(response) {


    var budgetCategoryMonthNov = response.data.budgetCategoryMonthNov;

    var ctx = document.getElementById("budgeted-expenses-category-month").getContext('2d');
    
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var expense = [],
        labels = [],
        categoryBudgets = [],
        categoriesExpensesForChart = [];

    response.data.categoriesExpensesForChart.forEach(function(cat) {
        if (cat.amountActiveMonth > 0)
        categoriesExpensesForChart.push(cat);
    });

    categoriesExpensesForChart.forEach(function (cat) {
        
        expense.push(cat.amountActiveMonth.toFixed(2));
        labels.push(cat.name);
        var budget = budgetCategoryMonthNov.find(function (o) { return o.categoryId === cat.id; })
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
        }],
        yAxes: [{
            ticks: {
                min: 0
            }
        }
    ]
    }
    var options = {
        scales: scales,
        responsive: true,
        title: {
            display: true,
            text: 'Wydatki w stosunku do zabudżetowanej kwoty',
            },
    }
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
};

function getDataToSpendAndExpensesAmountMonth(response) {   
    var ctx = document.getElementById("expense-amount-tospend-chart-analysis-month").getContext('2d'),
        data = [],
        labels = [],
        date = new Date(),
        month = date.getMonth();
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    var budgetForMonth = response.data.budgetMonthsForChart[month],
        expenseForMonth = response.data.AllExpensesForMonth[month].toFixed(2),
        toSpendAmount = (budgetForMonth - expenseForMonth).toFixed(2);
        
        if(toSpendAmount < 0) {
            toSpendAmount = 0;
        }
        
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

function getDataBudgetedCategoryMonth(response) {
    
    var budgetCategoryMonthNov = response.data.budgetCategoryMonthNov;
        allCategoriesForDisplay = response.data.categoriesName,
        ctx = document.getElementById("budgeted-category-month").getContext('2d');
    
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var labels = [],
        data = [];
    
    allCategoriesForDisplay.forEach(function (category){
        labels.push(category.name)
        category.amount = 0;
    });

    budgetCategoryMonthNov.forEach(function (budget) {
        var category  = allCategoriesForDisplay.find(o => o.id === budget.categoryId);
        category.amount += budget.amount
    });

    allCategoriesForDisplay.forEach(function (category){
        data.push(category.amount)
    });
    
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    
        data = {
            datasets: [ {
                data: data,
                backgroundColor: default_colors
                }
            ],
        labels: labels
        };
    
    var scales = {
        xAxes: [{
            ticks: {
                autoSkip: false,
                
            },
        }]
    }
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Zabudżetowane kwoty w danych kategoriach'
            },
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
};

axios.get('/api/charts/analysis')
.then(function (response) {
    getDataForCategoriesExpensesMonthly(response);
    getDataBudgetedAndExpensesCategoryMonth(response);
    getDataForExpensesLineChartMonthly(response);
    getDataForIncomeLineChartMonthly(response);    
    getDataToSpendAndExpensesAmountMonth(response);
    getDataBudgetedCategoryMonth(response);
})
.catch(function (error) {
    console.log(error);
});
