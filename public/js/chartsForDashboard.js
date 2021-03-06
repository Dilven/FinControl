function getDataForAnnualChartForDashboard(response) {
  
    var budgetMonthsForChart = response.data.budgetMonthsForChart,
        expenseMonthsForChart = response.data.AllExpensesForMonth,
        budgetsForDisplay = [],
        expenseForDisplay = [],
        mobileViewport = window.matchMedia("screen and (max-width: 1315px)"),
        container = document.getElementById("expenses-chart");            
        

        mobileViewport.addListener(function(mq) {
            if(mq.matches) {
                container.classList.remove('mdl-cell--4-col')
                container.classList.add('mdl-cell--6-col');
            } else {
                container.classList.remove('mdl-cell--6-col')
                container.classList.add('mdl-cell--4-col');
            }   
        });

    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth();
        monthsForLabels = [],
        monthNowNum = 0;

        for(var i = 0; i <= 11; i++ ) {

            if(monthNow < 11)
            {   monthNow++;
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
        },
        {
            data: expenseForDisplay,
            label:'Wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259'            
        }],
        labels: monthsForLabels,
    }

    var options = {
        
        scales: {
            yAxes: [{
                stacked: false
            }]
        
        },
        elements: {
            line: {
                tension: 0,
            }
        },

        title: {
            display: true,
            text: 'Budżet i wydatki w danym roku'
            } 
    }
    var ctx = document.getElementById("expenses-budget-annual-dashboard").getContext('2d');
    ctx.canvas.width = 539;
    ctx.canvas.height = 268;
    
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
};

function getDataToSpendAndExpensesAmountMonthDashboard(response) {   
    var ctx = document.getElementById("expense-amount-tospend-chart-dashboard-month").getContext('2d'),
        data = [],
        labels = [],
        date = new Date(),
        month = date.getMonth(),
        mobileViewport = window.matchMedia("screen and (max-width: 1315px)"),
        container = document.getElementById("categories-chart");            
        

        mobileViewport.addListener(function(mq) {
            if(mq.matches) {
                container.classList.remove('mdl-cell--4-col')
                container.classList.add('mdl-cell--6-col');
            } else {
                container.classList.remove('mdl-cell--6-col')
                container.classList.add('mdl-cell--4-col');
            }   
        });
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'],
        budgetForMonth = response.data.budgetMonthsForChart[month],
        expenseForMonth = response.data.AllExpensesForMonth[month].toFixed(2),
        toSpendAmount = (budgetForMonth - expenseForMonth).toFixed(2);
        

        if(toSpendAmount < 0) {
            toSpendAmount = 0;
        }  
    var dataForChart = [];
    
    dataForChart.push(expenseForMonth);
    dataForChart.push(toSpendAmount);

    var data = {
        datasets: [{
            data: dataForChart,
            backgroundColor: default_colors
        }],
        labels: ['Wydano', 'Pozostała kwota z budżetu'],
    };

    var options = {
        responsive: true,
        legend: {
            fullWidth: true,
            position: 'right',
            labels: {
                fontSize: 10,
                boxWidth: 10,
                padding: 1,
            }
        },
        title: {
        display: true,
        text: 'Ilość wydatków i pozostała kwota z budżetu miesięcznego'
        },
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDataForCategoriesChartForDashboard(response) {
    var ctx = document.getElementById("categories-chart-dashboard-monthly").getContext('2d'),
        data = [],
        labels = [],
        default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'],
        categoriesExpenseMonthNov = response.data.categoriesExpenseMonthNov,
        mobileViewport = window.matchMedia("screen and (max-width: 1315px)"),
        container = document.getElementById("chart-budgeted-category");            
        
        mobileViewport.addListener(function(mq) {
            if(mq.matches) {
                container.classList.remove('mdl-cell--4-col')
                container.classList.add('mdl-cell--12-col');
            } else {
                container.classList.remove('mdl-cell--12-col')
                container.classList.add('mdl-cell--4-col');
            }   
        });

    categoriesExpenseMonthNov.forEach(function (cat) {
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
        legend: {
            fullWidth: true,
            position: 'right',
            labels: {
                fontSize: 10,
                boxWidth: 10,
                padding: 1,
            }
        },
        title: {
            display: true,
            text: 'Wydatki z tego miesiąca'
            }
            
    }
    var myCategoriesChart = new Chart(ctx,{
        type: 'doughnut',
        data: data,
        options: options
    });
};

function getDataBudgetedCategoryMonthDashboard(response) {
    
        budgetCategoryMonthNov = response.data.budgetCategoryMonthNov,
        allCategoriesForDisplay = response.data.categoriesName,
        ctx = document.getElementById("budgeted-category-month-dashboard").getContext('2d');

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
                autoSkip: false
            }
        }]
    }
    var options = {
        responsive: true,
        legend: {
            fullWidth: true,
            position: 'right',
            labels: {
                fontSize: 10,
                boxWidth: 10,
                padding: 1,
            }
        },
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
}

axios.get('/api/charts/dashboard')
    .then(function (response) {
        getDataForCategoriesChartForDashboard(response);
        getDataForAnnualChartForDashboard(response);
        getDataToSpendAndExpensesAmountMonthDashboard(response);
        getDataBudgetedCategoryMonthDashboard(response);
        
    })
    .catch(function (error) {
        console.log(error);
    });

