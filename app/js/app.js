var app = angular.module('todoApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'view/home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
               url:'/about',
               templateUrl: 'view/about.html'     
        })

        .state('about.list', {
               url:'/list',
               templateUrl: 'view/partial-about.html'     
        });
        
});


app.filter("ordinal",function(){

	return function(input,optional1,optional2) {

		 console.log(optional1);
         
           if(isNaN(input) || input < 1)
           {
           	 return input ;
           }
           else
           {

               var lastdigit = input % 10;

               switch(lastdigit){
                    case 1:
                      return input + 'ST';
                      break;
                    case 2:
                      return input + 'ND';
                      break;
                    case 3:
                      return input + 'RD';
                      break;
                    default:
                      return input + 'TH' ;
                      break;  

               };

           }

	};
});

app.directive("myDirective",function(){

      return {
               restrict:'EA',
               template:'<div>{{greetings}}</div>',
               link:function(scope,elem,attr,ctrl){
                      
                      scope.greetings = "Hi, Mrinal Mondal , How are you ?";

                      elem.css("background-color", "#ff00ff");
               }

      }

});


app.factory('postService',['$http','$q',function($http,$q){

               return {

                    submitData:function(url,data,method){
                       
                        if(!angular.isDefined(method))
                        {
                        	method = 'POST';
                        }

                        var deferred = $q.defer();

                        $http({
                        	url:url,
                        	method:method,
                        	data:data,
                        	headers: {"X-Requested-With": "XMLHttpRequest", 'Authorization': ' Token ' + localStorage.getItem('infinitoToken')}
                        }).then(function(data,status){
                              deferred.resolve(data);  
                        },
                           function(data,status){
                             deferred.reject(data);
                           }
                        );

                        return deferred.promise;

                    }

               };    


}]);


app.service("preService",function(){

       return { getName:function(){

       	            console.log('service...');
                      }
               
       };

}); 


  //console.log(service);
 

  app.controller('TodoListController', function($scope,postService,preService) {


  	//preService.getName();


  $scope.save = function() {

  	var data   = {};

  	data.user  = $scope.user;
  	data.email = $scope.email;

  	// var data = $.param({
  	// 	user : $scope.user,
  	// 	email: $scope.email
  	// });

    var url = 'app/data.json';

  	 postService.submitData(url,data,'GET').then(function(data){ console.log('Success'+ data);},function(data){ console.log('error' + data);});

  	// console.log($scope.user);
    // console.log($scope.email);

  };

       //JSON Data
       $scope.products = [{name:"xyz",price:"201",sub:[{name:"fgfggfg",price:"345"},{name:"yyyyyy",price:"383"}]},
                           {name:"xyz",price:"202",sub:[{name:"sfsfsjf",price:"345"},{name:"dgdd",price:"383"}]},
                           {name:"xyz",price:"203",sub:[{name:"sssdsd",price:"345"},{name:"dgdd",price:"383"}]},
                           {name:"xyz",price:"204",sub:[{name:"dsasdas",price:"345"},{name:"dgdd",price:"383"}]}
                           ];

       $scope.todos = [
      {text:'xyz', done:true},{text:'mnc', done:false},
      {text:'zyc', done:false}, {text:'adg', done:false}, {text:'nsm', done:false}];                     



   $scope.setItem = function(event) {

              $(event.target).siblings('div').toggle(500);
    };


 
    //var todoList = this;
      //	todoList.name = "mrinal";



    /*
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };*/

  });

  //angular.bootstrap(document.getElementById("todoApp2"),['todoApp'],true);