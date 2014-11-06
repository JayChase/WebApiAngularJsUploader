'use strict';

describe('app egAppStatus directive', function () {
    var el, mockAppInfo;

    beforeEach(module('app'));
    beforeEach(module('app/egAppStatus.html'));
        
    beforeEach(inject(function ($compile, $rootScope) {
            var scope = $rootScope;
            scope.busy = false;
            scope.message = '';

            el = angular.element('<eg-app-status></eg-app-status>');
            //mockAppInfo = sinon.stub({
            //    busy: false,
            //    message: 'test',
            //    setInfo: function () { }
            //});
            
            $compile(el)(scope);
            scope.$digest();
            //console.log(el[0].outerHTML);
        }));

    it('should compile as expected', function () { 
        expect(true).toBe(true);
    });
});