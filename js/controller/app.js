var serverData;
var chartData;

(function ($) {
    'use strict';
    angular
        .module('app', ['chart.js', 'ngTable', 'ui.bootstrap'])

        .controller(
            'ChartCtrl',
            [
                '$scope',
                '$http',
                function ($scope, $http) {


                    $("#userdata").hide();
                    $("#tabelLabel").hide();

                    $http.get('http://127.0.0.1:5000/api/v1/dashboard/getCMDBCompletenessDetails/').then(function (response) {
                        //alert(response.data);
                        $scope.data = response.data;

                    $scope.showEl=false    ;

                    $scope.showPie=function(){
                        $scope.tableLable='Chef Correctness';
                        $scope.showEl=false    ;
                        }

                        $scope.filteredTodos = [],
                            $scope.currentPage = 1,
                            $scope.numPerPage = 10,
                            $scope.maxSize = 5;

                        // alert(Math.ceil(($scope.users.length)/10));
                        $scope.len = $scope.data.result.length;

                        $scope.totalpage = Math
                            .ceil(($scope.data.result.length) / 10);
                        $scope.$watch('currentPage + numPerPage',function () {
                                    // alert($scope.currentPage);
                                    $scope.curr = $scope.currentPage;
                                    var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
                                        + $scope.numPerPage;

                                    $scope.filteredTodos = $scope.data.result
                                        .slice(begin, end);
                                });
                    });

                    $scope.labels = ['January', 'February',
                        'March'];
                    // $scope.data = [65, 59, 80];
                    $scope.datasetOverride = [{
                        label: 'Minutes'
                    }];

                    $scope.labels1 = ['Monday', 'Tuesday',
                        'Wednesday'];
                    // $scope.data1 = [100, 40, 50];
                    $scope.datasetOverride1 = [{
                        label: 'Hours'
                    }];
                    $("#pie1")
                        .click(
                            function ($scope) {
                                $("#userdata").show();
                                $("#tabelLabel").show();
                                /*document.getElementById("tabelLabel").style.display = "block";
                                document.getElementById("userdata").style.display = "table";
                                document.getElementById("btndownload").style.display = "block";*/
                                $scope.tableLable='Chef Correctness';
                                //document.getElementById('tabelLabel').innerHTML = 'Chef Correctness';
                            });
                   /* $("#pie2")
                        .click(
                            function ($scope) {
                                $("#userdata").show();
                                $("#tabelLabel").show();
                                /!*document.getElementById("tabelLabel").style.display = "block";
                                document.getElementById("userdata").style.display = "table";
                                document.getElementById("btndownload").style.display = "block";*!/
                                //document.getElementById('tabelLabel').innerHTML = 'CMDB Correctness';
                                $scope.tableLable='CMDB Correctness';
                                alert($scope.tableLable);

                            });*/
                    $('#bar')
                        .click(
                            function (evt) {
                                document
                                    .getElementById("userdata").style.display = "table";
                                document
                                    .getElementById("btndownload").style.display = "block";
                                var ctx = document
                                    .getElementById(
                                        "bar")
                                    .getContext('2d');
                                var myNewChart = new Chart(
                                    ctx,
                                    {
                                        type: 'pie',
                                        data: chartData
                                    });
                                var activePoints = myNewChart
                                    .getElementAtEvent(evt);
                                var url = "http://example.com/?label=";

                            }
                        );

                }])

        .directive(
            'exportToCsv',
            function () {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        var el = element[0];
                        element
                            .bind(
                                'click',
                                function (e) {
                                    var table = e.target.nextElementSibling;
                                    var csvString = '';

                                    for (var i = 0; i < document
                                        .getElementById("tb").rows.length; i++) {
                                        var rowData = table.rows[i].cells;
                                        for (var j = 0; j < rowData.length; j++) {
                                            csvString = csvString
                                                + rowData[j].innerHTML
                                                + ",";
                                        }
                                        csvString = csvString
                                            .substring(
                                                0,
                                                csvString.length - 1);
                                        csvString = csvString
                                            + "\n";
                                    }
                                    csvString = csvString
                                        .substring(
                                            0,
                                            csvString.length - 1);
                                    var a = $(
                                        '<a/>',
                                        {
                                            style: 'display:none',
                                            href: 'data:application/octet-stream;base64,'
                                            + btoa(csvString),
                                            download: 'Server.csv'
                                        }).appendTo('body')
                                    a[0].click()
                                    a.remove();
                                });
                    }
                }
            })

})(jQuery);
