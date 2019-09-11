const app = angular.module("app", []);

class MyAppCtrl {
}

class CSVCtrl {

}

app.component("myApp", {
  template: `<haita name="'World'"></haita>`,
  controller: MyAppCtrl
});

app.component("csvRead", {
  template: `<csv></csv>`,
  controller: CSVCtrl
});

app.component("haita", {
  bindings: {
    name: "="
  },
  templateUrl: './component/haita.html',
  controller: function($scope) {

    $scope.main = {
      "color": "",
      "animal": "",
      "sel1": "",
      "sel2": ""
    };

    $scope.colors = [
      {"name":"赤", "value": "red"}, 
      {"name":"青", "value": "blue"}, 
      {"name":"黄色", "value": "yellow"}, 
      {"name":"紫", "value": "purple"}
    ];
    $scope.animals = [
      {"name":"犬", "value":"dog", "isDisable":isDisableForDogAndCat}, 
      {"name":"猫", "value":"cat", "isDisable":isDisableForDogAndCat}, 
      {"name":"象", "value":"pao", "isDisable":isDisableForPao}, 
      {"name":"カバ", "value":"hipo", "isDisable":isDisableForHipo}
    ];
    $scope.animal = null;
    $scope.t = null;
    $scope.sel1 = null;
    $scope.sel2 = null;
    $scope.s2List = [];
    $scope.clearAll = function() {
      $scope.main.animal = "";
      $scope.main.sel1 = "";
      $scope.main.sel2 = "";
    };
    $scope.$watch("main.animal",function(newValue){

      switch(newValue) {
        case "dog":
          $scope.s1List = [];
          $scope.main.sel1 = '';
          $scope.s2List = [1,2,3,4,5];
          break;
        case "cat":
          $scope.s1List = ['%'];
          $scope.main.sel1 = '%';
          $scope.s2List = [3,4,5,6];
          break;
        case "pao":
          $scope.s1List = [];
          $scope.main.sel1 = '';
          $scope.s2List = [3,4,5,6];
          break;
        case "hipo":
          $scope.s1List = ['無し'];
          $scope.main.sel1 = '無し';
          $scope.s2List = [7,8];
          break;
      }
    });

    function isDisableForDogAndCat(color) {
      if (color === "red" || color === 'blue') {
        return false;
      } else {
        return true;
      }
    }

    function isDisableForPao(color) {
      if (color === 'red' || color === 'blue') {
        return false;
      } else if (color === 'yellow') {
        $scope.main.animal = "pao";
        return false;
      } else {
        return true;
      }
    }

    function isDisableForHipo(color) {
      if (color === 'purple') {
        $scope.main.animal = "hipo"
        return false;
      } else {
        return true;
      }
    }
  }
});

app.component("csvDialog", {
  templateUrl: './component/csv.html',
  controller: function($scope) {
    $scope.list1 = [1,2,3,4];
    $scope.list2 = [5,6,7];
    $scope.main = {
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: ""
    }
  }
});

angular.bootstrap(document.body, [app.name]);