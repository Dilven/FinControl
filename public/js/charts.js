function getDataForCategoriesChart(response) {
        var ctx = document.getElementById("categoriesChart").getContext('2d'),
        data = [],
        labels = [];
        var categoriesForChart = response.data.categoriesForChart;
        categoriesForChart.forEach(function (cat) {
            data.push(cat.amount);
            labels.push(cat.name);
        })

        var data = {
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe'
                ]
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
    var ctx = document.getElementById("lineChart").getContext('2d')
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
};

axios.get('/api/charts')
    .then(function (response) {
        getDataForCategoriesChart(response);
       
        getDataForLineChart();
    })
    .catch(function (error) {
        console.log(error);
    });

