
function getDataForPieChart(response) {
        var ctx = document.getElementById("pieChart").getContext('2d'),
        data = [],
        labels = [];
        var categoriesForPieChart = response.data.categoriesForPieChart;
        categoriesForPieChart.forEach(function (cat) {
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

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        };

        var options = {
            responsive: true,
        }

        // For a pie chart
        var myPieChart = new Chart(ctx,{
            type: 'pie',
            data: data,
            options: options
        });
}


function getDataForLineChart() {
    var data = {
        datasets: [{
            data: [10, 20, 10, 40, 50, 30],
            label: 'wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259'

            
        },
        {
            data: [10, 20, 10, 100, 100, 30],
            label:'dochody',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'

            
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    }

    var options = {
        
        scales: {
            yAxes: [{
                stacked: true
            }]
       
        }
    }
    var ctx = document.getElementById("lineChart").getContext('2d')
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    console.log(myLineChart)
};

axios.get('/api/charts')
    .then(function (response) {
        getDataForPieChart(response);
        getDataForLineChart();
    })
    .catch(function (error) {
        console.log(error);
    });

