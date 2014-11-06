(function() {
    'use strict';

    angular
        .module('app.photo')
        .directive('egUpload', egUpload);

    egUpload.$inject = ['$timeout'];
    
    function egUpload($timeout) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                upload:'&egUpload'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var parentForm = element[0].form;
            if (parentForm) {
                element.on('click', function (event) {
                    //have to return promise to in case it is going to be used again
                    return scope.upload().then(function () {
                        //see:https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest for why needs to use timeout to avoid conflict
                        $timeout(function () {
                            parentForm.reset();
                        });
                    });
                });
            }
        }
    }

})();