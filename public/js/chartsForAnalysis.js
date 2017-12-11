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
getDataForCategoriesChart1();
getDataForCategoriesChart2();
console.log('dupa1');


