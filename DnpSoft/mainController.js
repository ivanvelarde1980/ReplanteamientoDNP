app.controller("mainController", function ($scope, $http, $interval) {
    $scope.hg = $("#mainHeader").height();
    $("#mainContent").css("padding-top", $scope.hg + 20);

    $scope.addCss = function () {
        $("#logoMenu").toggleClass("invisible");
        $("#logo").toggleClass("invisible");
    };

    $interval(function () {
        if ($("#aside").width() < 250) {
            $("#logoMenu").addClass("invisible");
            $("#logo").removeClass("invisible");
        }
        else {
            $("#logoMenu").removeClass("invisible");
            $("#logo").addClass("invisible");
        }
    }, 1);
});