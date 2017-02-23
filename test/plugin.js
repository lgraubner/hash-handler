/* eslint-env ndoe, mocha */
/* globals chai:false, describe:false, HashHandler:false, sinon:false */
/* eslint no-unused-expressions: 0 */
var expect = chai.expect;

describe('HashHandler', function () {
  var hash;

  describe('API', function () {
    beforeEach(function (done) {
      hash = HashHandler.getInstance();
      hash.clear();
      done();
    });

    describe('#clear()', function () {
      it('should be a function', function () {
        expect(hash.clear).to.be.a.function;
      });

      it('should clear the hash fragment', function (done) {
        hash.set('foo');

        expect(hash.clear()).to.be.ok;
        expect(window.location.hash).to.be.empty;
        done();
      });
    });

    describe('#get()', function () {
      it('should be a function', function () {
        expect(hash.get).to.be.a.function;
      });

      it('should return the hash fragment', function (done) {
        var str = 'foo ä';
        var strEncoded = encodeURI(str);

        window.location.hash = '#' + strEncoded;

        setTimeout(function () {
          var val = hash.get();
          expect(val).to.be.a.string;
          expect(val).to.equal(str);
          expect(hash.hash).to.equal(str);
          done();
        }, 50);
      });

      it('should parse the query string', function (done) {
        var str = 'foo=bar&num=2';
        var queryObj = {
          foo: 'bar',
          num: '2',
        };
        var strEncoded = encodeURI(str);

        window.location.hash = '#' + strEncoded;

        setTimeout(function () {
          var val = hash.get(true);
          expect(val).to.be.an.object;
          expect(val).to.deep.equal(queryObj);
          expect(hash.hash).to.equal(str);
          done();
        });
      });
    });

    describe('#listen()', function () {
      var listener;

      afterEach(function (done) {
        hash.unlisten(listener);
        done();
      });

      it('should listen for hash changes', function (done) {
        listener = hash.listen(sinon.spy());

        window.location.hash = 'foo';

        setTimeout(function () {
          expect(listener.cb.called).to.be.ok;
          done();
        }, 50);
      });

      it('should provide hash and parsed hash', function (done) {
        var str = 'foo';
        var obj = {
          foo: true,
        };
        listener = hash.listen(function (fragment, parsedHash) {
          expect(fragment).to.be.a.string;
          expect(fragment).to.equal(str);
          expect(parsedHash).to.deep.equal(obj);
          done();
        });
        window.location.hash = '#' + str;
      });
    });

    describe('#set()', function () {
      it('should be a function', function () {
        expect(hash.set).to.be.a.function;
      });

      it('should set hash fragment', function () {
        var str = 'foo ä';

        expect(hash.set(str)).to.be.ok;
        expect(window.location.hash).to.equal('#' + encodeURI(str));
      });
    });
  });
});
