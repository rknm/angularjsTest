const app = angular.module("app", []);

class MyAppCtrl {}

class CSVCtrl {

}

class ExCtrl {

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
  controller: function ($scope) {

    $scope.main = {
      "color": "",
      "animal": "",
      "sel1": "",
      "sel2": ""
    };

    $scope.colors = [{
        "name": "赤",
        "value": "red"
      },
      {
        "name": "青",
        "value": "blue"
      },
      {
        "name": "黄色",
        "value": "yellow"
      },
      {
        "name": "紫",
        "value": "purple"
      }
    ];
    $scope.animals = [{
        "name": "犬",
        "value": "dog",
        "isDisable": isDisableForDogAndCat
      },
      {
        "name": "猫",
        "value": "cat",
        "isDisable": isDisableForDogAndCat
      },
      {
        "name": "象",
        "value": "pao",
        "isDisable": isDisableForPao
      },
      {
        "name": "カバ",
        "value": "hipo",
        "isDisable": isDisableForHipo
      }
    ];
    $scope.animal = null;
    $scope.t = null;
    $scope.sel1 = null;
    $scope.sel2 = null;
    $scope.s2List = [];
    $scope.clearAll = function () {
      $scope.main.animal = "";
      $scope.main.sel1 = "";
      $scope.main.sel2 = "";
    };
    $scope.$watch("main.animal", function (newValue) {

      switch (newValue) {
        case "dog":
          $scope.s1List = [];
          $scope.main.sel1 = '';
          $scope.s2List = [1, 2, 3, 4, 5];
          break;
        case "cat":
          $scope.s1List = ['%'];
          $scope.main.sel1 = '%';
          $scope.s2List = [3, 4, 5, 6];
          break;
        case "pao":
          $scope.s1List = [];
          $scope.main.sel1 = '';
          $scope.s2List = [3, 4, 5, 6];
          break;
        case "hipo":
          $scope.s1List = ['無し'];
          $scope.main.sel1 = '無し';
          $scope.s2List = [7, 8];
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
  controller: function ($scope) {
    $scope.list1 = [1, 2, 3, 4];
    $scope.list2 = [5, 6, 7];
    $scope.main = {
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: ""
    }
  }
});

app.component("execDialog", {
      templateUrl: './component/ex.html',
      controller: function ($scope) {
        $scope.rList = [{
            "name": "new1",
            "uid": "123",
            "queryResult": {
              result: null,
              warnings: [],
              error: null
            },
            "execState": {
              "mess": "",
              "icon": ""
            }
          },
          {
            "name": "new2",
            "uid": "456",
            "queryResult": {
              result: null,
              warnings: [],
              error: null
            },
            "execState": {
              "mess": "",
              "icon": ""
            }
          },
          {
            "name": "new3",
            "uid": "789",
            "queryResult": {
              result: null,
              warnings: [],
              error: null
            },
            "execState": {
              "mess": "",
              "icon": ""
            }
          },
          {
            "name": "new4",
            "uid": "101112",
            "queryResult": {
              result: null,
              warnings: [],
              error: null
            },
            "execState": {
              "mess": "",
              "icon": ""
            }
          }
        ];

        let testObj = {
          completedR: 1,
          isRunning: false,
          results: {
            "123": {
              "error": null,
              "uid": "123",
              "rule": {
                "name": "new1",
                "uid": "abc"
              },
              "queryResult": {
                result: ["OK"],
                warnings: [],
                error: null
              }
            },
            "456": {
              "error": null,
              "uid": "456",
              "rule": {
                "name": "new2",
                "uid": "def"
              },
              "queryResult": {
                result: [],
                warnings: ["waaaaaarnings!!!"],
                error: null
              }
            },
            "789": {
              "error": null,
              "uid": "789",
              "rule": {
                "name": "new3",
                "uid": "ghi"
              },
              "queryResult": {
                result: [],
                warnings: [],
                error: "errrrrror!!!"
              }
            },
            "101112": {
              "error": null,
              "uid": "101112",
              "rule": {
                "name": "new4",
                "uid": "jkl"
              },
              "queryResult": {
                result: [],
                warnings: [],
                error: null
              }
            }
          }
        };
        $scope.onClick = function() {
          _.forEach($scope.rList, (obj) => {
            //console.log(testObj.results[obj.uid]);
            obj.queryResult = testObj.results[obj.uid].queryResult;
            obj.execState = parseObject(testObj.results[obj.uid].queryResult);
          });
        }

        $scope.checkExecState = function(r) {
          if (r.queryResult.result !== null && r.queryResult.result.length !== 0) {
            return "complete";
          } else if (r.queryResult.result !== null && r.queryResult.result.length === 0) {
            if (r.queryResult.warnings.length !== 0) {
              return "warning";
            } else if (r.queryResult.error !== null) {
              return "error";
            } else if (r.queryResult.error === null && r.queryResult.warnings.length === 0) {
              return "noResult";
            }
          }
        }

        function parseObject(r) {
          console.log(r);
          let obj = {
            "mess": "",
            "icon": "fas fa-circle-notch fa-spin"
          };
          if (r.result !== null && r.result.length !== 0) {
            obj.mess = "実行完了";
          } else if (r.result !== null && r.result.length === 0) {
            if (r.warnings.length !== 0) {
              obj.mess = "警告有り";
              obj.icon = "fa-exclamation-triangle";
            } else if (r.error !== null) {
              obj.mess = "エラーあり";
            } else if (r.error === null && r.warnings.length === 0) {
              obj.mess = "実行済。該当無し。";
            }
          }
          return obj;
        }

      }});

    angular.bootstrap(document.body, [app.name]);