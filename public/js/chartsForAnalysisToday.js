function getDataForCategoriesExpensesToday(response) {
    var ctx = document.getElementById("categories-expenses-today").getContext('2d'),
        data = [],
        labels = [];
        var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
    var categoriesForChart = response.data.categoriesForChart;

    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    categoriesForChart.forEach(function (cat) {
        if(cat.amountActiveDay > 0) {
            data.push(cat.amountActiveDay.toFixed(2));
            labels.push(cat.name);            
        }
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

function getDataToSpendAndExpensesAmountDay(response) {   
    var ctx = document.getElementById("expense-amount-tospend-chart-analysis-today").getContext('2d'),
        data = [],
        labels = [],
        date = new Date(),
        month = date.getMonth();
        day = date.getDate();
        numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    var budgetForMonth = response.data.budgetMonthsForChart[month]/numberOfDays,
        expenseForMonth = response.data.AllExpensesForDay[day].toFixed(2),
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


axios.get('/api/charts/analysis')
    .then(function (response) {
        getDataForCategoriesExpensesToday(response);
        getDataToSpendAndExpensesAmountDay(response);
    })
    .catch(function (error) {
        console.log(error);
    });


