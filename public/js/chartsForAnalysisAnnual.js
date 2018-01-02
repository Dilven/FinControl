function getDataForCategoriesExpensesAnnual(response) {
    var ctx = document.getElementById("categories-expenses-annual").getContext('2d'),
        data = [],
        labels = [],
        default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
         
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var categoriesExpensesForChart = response.data.categoriesExpensesForChart;
    
    categoriesExpensesForChart.forEach(function (cat) {
        data.push(cat.amount.toFixed(2));
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
        text: 'Wydane kwoty w danych kategoriach na przestrzeni roku'
        },
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDataForExpensesAndBudgetAnnual(response) {
    var budgetMonthsForChart = response.data.budgetMonthsForChart,
        expenseMonthsForChart = response.data.AllExpensesForMonth,
        budgetsForDisplay = [],
        expenseForDisplay = [];
 
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth(),
        monthsForLabels = [],
        monthNowNum = 0;

    for(var i = 0; i <= 11; i++ ) {
        if(monthNow < 11) {
            monthNow++;            
            monthsForLabels.push(months[monthNow]);
            budgetsForDisplay.push(budgetMonthsForChart[monthNow].toFixed(2));
            expenseForDisplay.push(expenseMonthsForChart[monthNow].toFixed(2));
        }
        else {
            monthsForLabels.push(months[monthNowNum]);
            budgetsForDisplay.push(budgetMonthsForChart[monthNowNum].toFixed(2));
            expenseForDisplay.push(expenseMonthsForChart[monthNowNum].toFixed(2));
            monthNowNum++; 
        }
    }

    var data = {
        datasets: [{
            data: budgetsForDisplay,
            label: 'Budżet',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'   
        }, {
            data: expenseForDisplay,
            label:'Wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259'   
        }],
        labels: monthsForLabels,
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
                tension: 0,
            }
        },
        padding:0,

        title: {
            display: true,
            text: 'Budżet i wydatki na przestrzeni roku'
            }    
    }

    var ctx = document.getElementById("expenses-budget-annual").getContext('2d');
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });
};

function getDataToSpendAndExpensesAmountAnnual(response) {   
    var ctx = document.getElementById("expense-amount-tospend-chart-analysis-annual").getContext('2d'),
        data = [],
        labels = [],
        date = new Date(),
        month = date.getMonth();
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
        allExpensesMonths = response.data.AllExpensesForMonth,
        allBudgetedMonths = response.data.budgetMonthsForChart,
        expenseForYear = 0,
        budgetForYear = 0,
        toSpendAmountForYear = 0,
        dataForChart = [];

    allExpensesMonths.forEach(function(expense) {
        expenseForYear += expense;
    });
    allBudgetedMonths.forEach(function(budget) {
        budgetForYear += budget;
    });

    toSpendAmountForYear = (budgetForYear- expenseForYear).toFixed(2);
    
    if(toSpendAmountForYear < 0) {
        toSpendAmountForYear = 0;
    }

    dataForChart.push(expenseForYear.toFixed(2));
    dataForChart.push(toSpendAmountForYear);

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
        text: 'Ilość wydatków i pozostała kwota na przestrzeni roku'
        },
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
};

function getDataForIncomeAnnual(response) {
    var IncomeMonthsForChart = response.data.AllIncomeForMonth,
        expenseMonthsForChart = response.data.AllExpensesForMonth,    
        incomeForDisplay = []
        expenseForDisplay = [];
   
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth(),
        monthsForLabels = [],
        monthNowNum = 0;

    for(var i = 0; i <= 11; i++ ) {
        if(monthNow < 11) { 
            monthNow++;            
            monthsForLabels.push(months[monthNow]);
            incomeForDisplay.push(IncomeMonthsForChart[monthNow].toFixed(2));
            expenseForDisplay.push(expenseMonthsForChart[monthNow].toFixed(2));            
        }
        else {
            monthsForLabels.push(months[monthNowNum]);
            incomeForDisplay.push(IncomeMonthsForChart[monthNowNum].toFixed(2));
            expenseForDisplay.push(expenseMonthsForChart[monthNowNum].toFixed(2));            
            monthNowNum++; 
        }
    }

    var data = {
        datasets: [{
            data: incomeForDisplay,
            label: 'Przychody',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'
        },
        {
            data: expenseForDisplay,
            label: 'Wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259',
        }],
        labels: monthsForLabels,
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
            text: 'Przychody na przestrzeni roku'
            }
    }
    var ctx = document.getElementById("income-annual").getContext('2d');
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });
};

function getDataBudgetedAndExpensesCategoryAnnual(response) {

    var budgetCategoryYearNov = response.data.budgetCategoryYearNov,
        allExpense = response.data.categoriesExpensesForChart,   
        allCategoriesForDisplay = response.data.categoriesName;
        
    var ctx = document.getElementById("budgeted-expenses-category-annual").getContext('2d');
    
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var expense = [],
        labels = [],
        expens = [],
        budget = [];

    allCategoriesForDisplay.forEach(function (category){
        labels.push(category.name);
        category.amountExpense = 0;
    });

    allExpense.forEach(function (expense) {
        var category  = allCategoriesForDisplay.find(o => o.id === expense.id);
        category.amountExpense += expense.amount;
    });
    
    allCategoriesForDisplay.forEach(function (category){
        expense.push(category.amountExpense);
        budget.push(category.amount);     
    });

    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    
        data = {
            datasets: [{
                data: expense,
                label: 'Wydano',
                backgroundColor: '#DC3912',
                }, {
                data: budget,
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

function getDataBudgetedCategoryAnnual(response) {
    
    var budgetCategoryYearNov = response.data.budgetCategoryYearNov,
        allCategoriesForDisplay = response.data.categoriesName,
        ctx = document.getElementById("budgeted-category-annual").getContext('2d');
    
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

        var data = [],
            labels = [];

    allCategoriesForDisplay.forEach(function (category){
        labels.push(category.name)
        category.amount = 0;
    });

    budgetCategoryYearNov.forEach(function (budget) {
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
        getDataForExpensesAndBudgetAnnual(response);
        getDataForCategoriesExpensesAnnual(response);
        getDataToSpendAndExpensesAmountAnnual(response);
        getDataForIncomeAnnual(response);
        getDataBudgetedCategoryAnnual(response);
        getDataBudgetedAndExpensesCategoryAnnual(response);
    })
    .catch(function (error) {
        console.log(error);
    });