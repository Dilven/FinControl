function getDataForCategoriesExpensesAnnual(response) {
    var ctx = document.getElementById("categories-expenses-annual").getContext('2d'),
        data = [],
        labels = [],
        default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
         
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    var categoriesForChart = response.data.categoriesForChart;
    
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
        if(monthNow < 11)
        {
            monthsForLabels.push(months[monthNow]);
            budgetsForDisplay.push(budgetMonthsForChart[monthNow]);
            expenseForDisplay.push(expenseMonthsForChart[monthNow]);
            monthNow++;
        }
        else {
            monthsForLabels.push(months[monthNowNum]);
            budgetsForDisplay.push(budgetMonthsForChart[monthNowNum]);
            expenseForDisplay.push(expenseMonthsForChart[monthNowNum]);
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
                tension: 0, // disables bezier curves
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

    dataForChart.push(expenseForYear);
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
        IncomeForDisplay = [];
   
 
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth(),
        monthsForLabels = [],
        monthNowNum = 0;

    for(var i = 0; i <= 11; i++ ) {
        if(monthNow < 11)
        {
            monthsForLabels.push(months[monthNow]);
            IncomeForDisplay.push(IncomeMonthsForChart[monthNow]);
            monthNow++;
        }
        else {
            monthsForLabels.push(months[monthNowNum]);
            IncomeForDisplay.push(IncomeMonthsForChart[monthNowNum]);
            monthNowNum++; 
        }
    }

    var data = {
        datasets: [{
            data: IncomeForDisplay,
            label: 'Przychody',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'

            
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

axios.get('/api/charts/analysis')
    .then(function (response) {
        getDataForExpensesAndBudgetAnnual(response);
        getDataForCategoriesExpensesAnnual(response);
        getDataToSpendAndExpensesAmountAnnual(response);
        getDataForIncomeAnnual(response);
    })
    .catch(function (error) {
        console.log(error);
    });