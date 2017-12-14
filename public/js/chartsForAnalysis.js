function getDataForCategoriesChart1() {
    var ctx = document.getElementById("categoriesChart1").getContext('2d');
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];


    
        data = {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: default_colors
            }],
        labels: [
            'Produkty spozywcze',
            'Rozrywka',
            'Dzieci'
            ]
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
function getDataForCategoriesChart2() {
    var ctx = document.getElementById("categoriesChart2").getContext('2d');
        
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];


    
        data = {
            datasets: [{
                data: [100, 200, 200,400,250,150],
                label: 'Wydano',
                backgroundColor: default_colors,
            }, {
                data: [ 150, 300, 100,250,400,150],
                label: 'Zabudrzetowana kwota',
                backgroundColor: default_colors
            }
            ],
        labels: [
            'Produkty spozywcze',
            'Rozrywka',
            'Dzieci',
            'Rachunki',
            'Samochód',
            'Edukacja'
            ]
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

function getDataForLineChart1() {
    var data = {
        datasets: [{
            data: [10, 20, 10, 40, 50, 30,60,40,45,39,38],
            label: 'Wydatki',
            borderColor: '#f44259',
            fill: false,
            backgroundColor: '#f44259'

            
        },
        {
            data: [10, 20, 10, 101, 93, 30,50,60,40,45,39,38],
            label:'Dochody',
            borderColor: '#297720',
            fill: false,
            backgroundColor: '#297720'

            
        }],
        labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesień', 'Listopad', 'Grudzień'],
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

getDataForCategoriesChart1();
getDataForCategoriesChart2();
getDataForLineChart1();
getDataForLineChart2();

console.log('dupa1');


