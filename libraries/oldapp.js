
var serverData;
var chartData;

(function ($) {
  'use strict';
  angular.module('app', ['chart.js','ngTable','ui.bootstrap'])

   

  .controller('ChartCtrl', ['$scope', '$http', function ($scope, $http) {
 
 document.getElementById("userdata").style.display="none";
 document.getElementById("btndownload").style.display="none";
 

 //page

 $scope.users = [
      {
        first_name: 'Shyam',
        last_name: 'Mondal',
        id: '1',
        company: 'TCS',
        email: 'smonda@its.jnj.com'
      },

      {
        first_name: 'Ankit',
        last_name: 'Mahto',
        id: '2',
        company: 'TCS',
        email: 'amhto@its.jnj.com'
      },

      {
        first_name: 'Sumesh',
        last_name: 'Mathew',
        id: '3',
        company: 'TCS',
        email: 'smathe87@its.jnj.com'
      },
	    {
        first_name: 'Suresh',
        last_name: 'Jani',
        id: '4',
        company: 'TCS',
        email: 'suresh87@its.jnj.com'
      },
	  {
        first_name: 'Snehal',
        last_name: 'Jain',
        id: '5',
        company: 'TCS',
        email: 'snehal87@its.jnj.com'
      },
	  {
        first_name: 'Ramesh',
        last_name: 'Bhatt',
        id: '6',
        company: 'TCS',
        email: 'ramesh87@its.jnj.com'
      },
	  {
        first_name: 'Parthvi',
        last_name: 'Makwana',
        id: '7',
        company: 'TCS',
        email: 'Partvhi87@its.jnj.com'
      },
	  {
        first_name: 'Manu',
        last_name: 'Vakharia',
        id: '8',
        company: 'TCS',
        email: 'Vakharia87@its.jnj.com'
      },
	  {
        first_name: 'Sumesh',
        last_name: 'Mathew',
        id: '9',
        company: 'TCS',
        email: 'smathe87@its.jnj.com'
      },
	  {
        first_name: 'Siddharth',
        last_name: 'Panchal',
        id: '310',
        company: 'TCS',
        email: 'pancha87@its.jnj.com'
      },
	  {
        first_name: 'Nidhi',
        last_name: 'Kikani',
        id: '11',
        company: 'TCS',
        email: 'kikani87@its.jnj.com'
      },
	  {
        first_name: 'Raju',
        last_name: 'Dabhi',
        id: '12',
        company: 'TCS',
        email: 'raju87@its.jnj.com'
      }


    ];
  
  $scope.filteredTodos = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;
 
 //alert(Math.ceil(($scope.users.length)/10));
 $scope.totalpage=Math.ceil(($scope.users.length)/10);
  $scope.$watch('currentPage + numPerPage', function() {
 //alert($scope.currentPage);
 $scope.curr=$scope.currentPage;
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
   
    $scope.filteredTodos = $scope.users.slice(begin, end);

	
  });


 //page










 


    $scope.labels = ['January', 'February', 'March'];
    //$scope.data = [65, 59, 80];
    $scope.datasetOverride = [{
      label: 'Minutes'
    }];

    $scope.labels1 = ['Monday', 'Tuesday', 'Wednesday'];
   // $scope.data1 = [100, 40, 50];
    $scope.datasetOverride1 = [{
      label: 'Hours'
    }];
	$( "#pie1" ).click(function() {
  document.getElementById("userdata").style.display="table";
	  document.getElementById("btndownload").style.display="block";
});
$( "#pie2" ).click(function() {
  document.getElementById("userdata").style.display="table";
	  document.getElementById("btndownload").style.display="block";
});
    $('#bar').click(
	 
      function( evt ){
	  document.getElementById("userdata").style.display="table";
	  document.getElementById("btndownload").style.display="block";
	 var ctx = document.getElementById("bar").getContext('2d');
	 var myNewChart = new Chart(ctx, {
  type: 'pie',
  data: chartData
});
        var activePoints = myNewChart.getElementAtEvent(evt);
        var url = "http://example.com/?label=";
        
      }
	  
    );

   /* $scope.users = [
      {
        first_name: 'Shyam',
        last_name: 'Mondal',
        id: '1',
        company: 'TCS',
        email: 'smonda@its.jnj.com'
      },

      {
        first_name: 'Ankit',
        last_name: 'Mahto',
        id: '2',
        company: 'TCS',
        email: 'amhto@its.jnj.com'
      },

      {
        first_name: 'Sumesh',
        last_name: 'Mathew',
        id: '3',
        company: 'TCS',
        email: 'smathe87@its.jnj.com'
      }

    ];*/

  }])
  
  .directive('exportToCsv',function(){
  	return {
    	restrict: 'A',
    	link: function (scope, element, attrs) {
    		var el = element[0];
	        element.bind('click', function(e){
	        	var table = e.target.nextElementSibling;
	        	var csvString = '';
				
	        	for(var i=0; i<document.getElementById("tb").rows.length;i++){
	        		var rowData = table.rows[i].cells;
	        		for(var j=0; j<rowData.length;j++){
	        			csvString = csvString + rowData[j].innerHTML + ",";
	        		}
	        		csvString = csvString.substring(0,csvString.length - 1);
	        		csvString = csvString + "\n";
			    }
	         	csvString = csvString.substring(0, csvString.length - 1);
	         	var a = $('<a/>', {
		            style:'display:none',
		            href:'data:application/octet-stream;base64,'+btoa(csvString),
		            download:'Server.csv'
		        }).appendTo('body')
		        a[0].click()
		        a.remove();
	        });
    	}
  	}
	})
  
   
  //scope.tablehead =['FirstName', 'LastName' , 'id', 'company', 'email']


})(jQuery);



