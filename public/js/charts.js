function getDataForCategoriesChart(response) {
        var ctx = document.getElementById("categoriesChart").getContext('2d'),
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


function getDataForLineChart() {
    var data = {
        datasets: [{
            data: [10, 20, 10, 40, 50, 30],
            label: 'Wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259'

            
        },
        {
            data: [10, 20, 10, 101, 93, 30],
            label:'Dochody',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'

            
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
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
    var ctx = document.getElementById("line-chart").getContext('2d')
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
};

axios.get('/api/charts/dashboard')
    .then(function (response) {
        getDataForCategoriesChart(response);
       
        getDataForLineChart();
    })
    .catch(function (error) {
        console.log(error);
    });

