var dashboard3 = (function () {

    "use strict";

    // Currently selected values in the dashboard
    var selectedYear = "2010",
        selectedCountryIdx = 0,
        selectedCountry = "USA",
        selectedMedalType = "Gold";

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

    function createPieChart(selector) {
        $(selector).dxPieChart({
            dataSource: getTypeByCountry(selectedYear, selectedCountryIdx),
            animation: {
                duration: 350
            },
            title: {
                text: selectedCountry + " Medals in " + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                horizontalAlignment: "right",
                verticalAlignment: "top",
                margin: 0
            },
            series: [
                {
                    type: "doughnut",
                    argumentField: "type",
                    valueField: "count",
                    label: {
                        visible: true,
                        connector: {
                            visible: true
                        }
                    }
                }
            ],
            pointClick: function(clickedPoint, clickEvent){
                console.log(clickedPoint);
                selectedMedalType = clickedPoint.argument;
                updateHBarChart();
            }
        });
    }

    function createHBarChart(selector) {
        $(selector).dxChart({
            dataSource: results[selectedYear],
            animation: {
                duration: 350
            },
            title: {
                text: selectedMedalType + ' Medals in ' + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                visible: false
            },
            rotated: true,
            series: {
                argumentField: "Country",
                valueField: selectedMedalType,
                name: "Medals",
                type: "bar",
                color: '#ffa500'
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

    function updatePieChart() {
        var chart3 = $("#chart3").dxPieChart("instance");
        chart3.option({
            dataSource: getTypeByCountry(selectedYear, selectedCountryIdx),
            title: selectedCountry + " Medals in " + selectedYear
        });
    }

    function updateHBarChart() {
        var chart4 = $("#chart4").dxChart("instance");
        chart4.option({
            dataSource: results[selectedYear],
            title: selectedMedalType + ' Medals in ' + selectedYear,
            series: {
                valueField: selectedMedalType
            }

        });
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart"></div>' +
            '<div id="chart2" class="chart"></div>' +
            '<div id="chart3" class="chart"></div>' +
            '<div id="chart4" class="chart"></div>';

        $("#content").html(html);

        createLineChart('#chart1');
        createBarChart('#chart2');
        createPieChart('#chart3');
        createHBarChart('#chart4');

    }

    /* Functions to transform/format the data as required by specific charts */

    function getTypeByCountry(year, countryIdx) {
        var item = results[year][countryIdx];
        return [
            {'type': 'Gold', 'count': item.Gold},
            {'type': 'Silver', 'count': item.Silver},
            {'type': 'Bronze', 'count': item.Bronze}
        ];
    }

    return {
        render: render
    }

}());