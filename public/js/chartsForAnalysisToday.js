function getDataForCategoriesChart1(response) {
       var ctx = document.getElementById("categoriesChart1").getContext('2d'),
            data = [],
            labels = [];
            var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
        var categoriesForChart = response.data.categoriesForChart;
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

function getDataForLineChart1(response) {

    var budgetMonthsForChart = response.data.budgetMonthsForChart,
        budgets = [];

    budgetMonthsForChart.forEach(function (bud) {
        budgets.unshift(bud.amount);
    })
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth(),
        monthsForLabels = [],
        monthNowNum = 0;

        for(var i = 0; i <= 11; i++ )
            {
                if(monthNow <= 11)
                {
                    monthsForLabels.unshift(months[monthNow]);
                    monthNow++;
                }
                else {
                    monthsForLabels.unshift(months[monthNowNum])
                    monthNowNum++; 
                }
            }
            
        console.log(monthsForLabels);

    var data = {
        datasets: [{
            data: budgets,
            label: 'Budget',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'

            
        },
        {
            data: [10, 20, 10, 10000, 93, 30,50,60,40,45,39,38],
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
                tension: 0, // disables bezier curves
            }
        },
        padding:0,

        title: {
            display: true,
            text: 'Twoje dochody i przychody'
          }
          
        
    }
    var ctx = document.getElementById("line-chart1").getContext('2d')
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
};

function getDataForLineChart2() {
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            //new option, type will default to bar as that what is used to create the scale
            type: "line",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [100, 59, 4, 81, 56, 55, 40]
        }, {
            label: "Słupkowy",
            //new option, type will default to bar as that what is used to create the scale
            
            
            data: [32, 25, 33, 88, 12, 92, 33]
        }]
        
    };
        var lineBar = document.getElementById("line-chart2").getContext("2d");
        var myLineBarChart = new Chart(lineBar, {
            type: 'line',
            data:data
        });
}




getDataForLineChart2();

axios.get('/api/charts/analysis')
.then(function (response) {
    getDataForCategoriesChart1(response);
    getDataForCategoriesChart2(response);
    getDataForLineChart1(response);
})
.catch(function (error) {
    console.log(error);
});


