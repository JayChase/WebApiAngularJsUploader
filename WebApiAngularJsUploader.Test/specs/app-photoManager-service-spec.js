'use strict';

describe('app photoManager service', function () {
    var mockPhotoManagerClient, mockAppInfo, mockQ, fakePromise, fakeHttpPromise;
    
    fakeHttpPromise = function (resolve, result) {
        return {
            $promise: {
                then: function (fn1, fn2) {
                    if (resolve) {
                        if (fn1) {
                            fn1(result);
                        }
                    } else {
                        if (fn2) {
                            fn2(result);
                        }
                    }
                    
                    return this;
                },
                'finally': function (fn) {
                    if (fn) {
                        fn();
                    }
                    return this;
                }
            }
        };
    };
    
    fakePromise = function (resolve, result) {
        return {
            then: function (fn1, fn2) {
                if (resolve) {
                    if (fn1) {
                        fn1(result);
                    }
                } else {
                    if (fn2) {
                        fn2(result);
                    }
                }
                
                return this;
            },
            'finally': function (fn) {
                if (fn) {
                    fn();
                }
                return this;
            }
        };
    };

    beforeEach(module('app'));
    
    beforeEach(function () {
        mockPhotoManagerClient = sinon.stub({
            query: function () {},
            save: function () { },
            remove: function () { }
        });
        
        mockPhotoManagerClient.query.returns(fakeHttpPromise(true, {
                photos: [{name: 'test1'}],
                $promise: fakePromise(true, {})
        }));
        
        mockAppInfo = sinon.stub({
            busy: false,
            message: '',
            setInfo: function (){
            }
        });
        
        mockQ = sinon.stub({
            reject: function () { }
        });

        //use $provide to set up service mock injection
        module(function ($provide) {
            $provide.value('photoManagerClient', mockPhotoManagerClient);
            $provide.value('appInfo', mockAppInfo);
            $provide.value('$q', mockQ);
        });
    });
    
    //use the injector directly for testing services
    it('load sets appInfo busy to true', inject(function (photoManager) {
            photoManager.load();
            expect(mockAppInfo.setInfo.calledWith(sinon.match({busy:true}))).toBe(true);
        }));

    it('load sets appInfo busy to true', inject(function (photoManager) {
            photoManager.load();
            expect(mockAppInfo.setInfo.calledWith(sinon.match({ message: 'loading photos' }))).toBe(true);
        }));

    it('load clears photos array', inject(function (photoManager) {
            photoManager.photos.push({});
            photoManager.load();
            expect(photoManager.photos.length).toBe(1);
        }));

    it('load successful adds result.photos to photos', inject(function (photoManager) {            
            photoManager.load()['finally'](
                function (){
                    expect(photoManager.photos.length).toBe(1);
                }
            );            
        }));
    
    it('load successful sets busy false', inject(function (photoManager) {
            photoManager.load()['finally'](
                function () {
                    expect(mockAppInfo.busy).toBe(false);
                }
            );
        }));

    it('load failed sets appInfo.message to error', inject(function (photoManager) {
            mockPhotoManagerClient.query.returns(fakeHttpPromise(false, {
                     data: {message: 'error'}
                }));

            photoManager.load()['finally'](
                function () {
                    expect(mockAppInfo.setInfo.calledWith(sinon.match({ message: 'something went wrong: error' }))).toBe(true);
                }
            );    
        }));

    it('load failed calls $q.reject()', inject(function (photoManager) {
            mockPhotoManagerClient.query.returns(fakeHttpPromise(false, {
                    data: { message: 'error' }
                }));
        
            photoManager.load()['finally'](
                function () {
                    expect(mockQ.reject.called).toBe(true);
                }
            );                    
        }));

    it('photoExists returns true if name matches', inject(function (photoManager) {
            var res = false;
            
            photoManager.load()['finally'](function () { 
                res = photoManager.photoExists('test1');
            });
            
            expect(res).toBe(true);
        }));

    it('photoExists returns false if name matches', inject(function (photoManager) {
            var res = photoManager.photoExists('test99');
            expect(res).toBe(false);
        }));

});