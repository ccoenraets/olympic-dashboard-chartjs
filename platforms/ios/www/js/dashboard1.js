var dashboard1 = (function () {

    // Currently selected values in the dashboard
    var selectedYear = "2010",
        selectedCountryIdx = 0,
        selectedCountry = "USA";

    /* Functions to create the individual charts involved in the dashboard */

    function createLineChart(selector) {
        $(selector).dxChart({
            dataSource: summary,
            animation: {
                duration: 350
            },
            commonSeriesSettings: {
                argumentField: "year"
            },
            series: [
                { valueField: "Canada", name: "Canada" },
                { valueField: "Germany", name: "Germany" },
                { valueField: "Norway", name: "Norway" },
                { valueField: "Russia", name: "Russia" },
                { valueField: "USA", name: "USA" }
            ],
            argumentAxis: {
                grid: {
                    visible: true
                }
            },
            tooltip: {
                enabled: true
            },
            title: {
                text: "Top 5 Medal Countries",
                font: {
                    size: "24px"
                }
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            },
            commonPaneSettings: {
                border: {
                    visible: true,
                    right: false
                }
            },
            pointClick: function(clickedPoint, clickEvent){
                selectedYear = clickedPoint.argument.substr(0,4);
                updateBarChart();
                updatePieChart();
                updateHBarChart();
            }
        });
    }

    function createBarChart(selector) {
        return $(selector).dxChart({
            dataSource: results[selectedYear],
            animation: {
                duration: 350
            },
            title: {
                text: "Total Medals by Country in " + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                visible: false
            },
            series: {
                argumentField: "Country",
                valueField: "Total",
                name: "Medals",
                type: "bar",
                color: '#ffa500'
            },
            pointClick: function(clickedPoint, clickEvent){
                selectedCountry = clickedPoint.argument;
                for (var i=0; i < results[selectedYear].length; i++) {
                    if (results[selectedYear][i]["Country"] === selectedCountry) {
                        selectedCountryIdx = i;
                        break;
                    }
                }
                updatePieChart();
                updateHBarChart();
            }
        });
    }

    /* Functions to update individual charts when their underlying dataset changes */

    function updateBarChart() {
        var chart2 = $("#chart2").dxChart("instance");
        chart2.option({
            dataSource: results[selectedYear],
            title: "Total Medals by Country in " + selectedYear
        });
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart2"></div>' +
            '<div id="chart2" class="chart2"></div>';

        $("#content").html(html);

        createLineChart('#chart1');
        createBarChart('#chart2');

    }

    return {
        render: render
    }

}());