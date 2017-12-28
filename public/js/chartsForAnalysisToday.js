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
    
})
.catch(function (error) {
    console.log(error);
});


