// dac tutatj wykresy na roczną analize
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
    
    axios.get('/api/charts/analysis')
    .then(function (response) {
        getDataForLineChart1(response);
    })
    .catch(function (error) {
        console.log(error);
    });