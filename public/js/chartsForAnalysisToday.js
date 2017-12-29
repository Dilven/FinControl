function getDataForCategoriesExpensesToday(response) {
    var ctx = document.getElementById("categories-expenses-today").getContext('2d'),
         data = [],
         labels = [];
         var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
     var categoriesForChart = response.data.categoriesForChartToday;
     ctx.canvas.width = 235;
     ctx.canvas.height = 220;
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
        getDataForCategoriesExpensesToday(response);
    })
    .catch(function (error) {
        console.log(error);
    });


