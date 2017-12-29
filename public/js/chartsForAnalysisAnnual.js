function getDataForExpensesAndBudgetAnnual(response) {
    console.log(response.data.budgetMonthsForChart); 
    var budgetMonthsForChart = response.data.budgetMonthsForChart,
        expenseMonthsForChart = response.data.AllExpensesForMonth,
        budgetsForDisplay = [],
        expenseForDisplay = [];
   
 
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    var monthNow = new Date().getMonth(),
        monthsForLabels = [],
        monthNowNum = 0;

        for(var i = 0; i <= 11; i++ )
            {
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
            text: 'Budżet i wydatki w danym roku'
            }
            
        
    }
    var ctx = document.getElementById("expenses-budget-annual").getContext('2d');
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

    
    var img = new Image();
    img.src = "../images/noDataForChart.png";

    if (budgetMonthsForChart.length === 0) {
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
function getDataForCategoriesExpensesAnnual(response) {
    var ctx = document.getElementById("categories-expenses-annual").getContext('2d'),
        data = [],
        labels = [],
        default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
         
    ctx.canvas.width = 235;
    ctx.canvas.height = 220;

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
axios.get('/api/charts/analysis')
    .then(function (response) {
        getDataForExpensesAndBudgetAnnual(response);
        getDataForCategoriesExpensesAnnual(response);
    })
    .catch(function (error) {
        console.log(error);
    });