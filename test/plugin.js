var expect = chai.expect;

describe("HashHandler", function() {
    var hash;

    describe("API", function() {

        beforeEach(function(done) {
            HashHandler.clear();
            done();
        });

        describe("#clear()", function() {
            it("should be a function", function() {
                expect(HashHandler.clear).to.be.a.function;
            });

            it("should clear the hash fragment", function(done) {
                HashHandler.set("foo");

                expect(HashHandler.clear()).to.be.ok;
                expect(window.location.hash).to.be.empty;
                done();
            });
        });

        describe("#get()", function() {
            it("should be a function", function() {
                expect(HashHandler.get).to.be.a.function;
            });

            it("should return the hash fragment", function(done) {
                var str = "foo";

                window.location.hash = "#" + str;

                setTimeout(function() {
                    var val = HashHandler.get();
                    expect(val).to.be.a.string;
                    expect(val).to.equal(str);
                    done();
                }, 50);
            });
        });

        describe("#listen()", function() {

            var listener;

            afterEach(function(done) {
                HashHandler.unlisten(listener);
                done();
            });

            it("should listen for hash changes", function(done) {
                listener = HashHandler.listen(sinon.spy());

                window.location.hash = "foo";

                setTimeout(function() {
                    expect(listener.cb.called).to.be.ok;
                    done();
                }, 50);
            });

            it("should provide hash fragment", function(done) {
                var str = "foo";
                listener = HashHandler.listen(function(fragment) {
                    expect(fragment).to.be.a.string;
                    expect(fragment).to.equal(str);
                    done();
                });
                window.location.hash = "#" + str;
            });
        });

        describe("#set()", function() {
            it("should be a function", function() {
                expect(HashHandler.set).to.be.a.function;
            });

            it("should set hash fragment", function() {
                var str = "foo";

                expect(HashHandler.set(str)).to.be.ok;
                expect(window.location.hash).to.equal("#" + str);
            });
        });
    });
});
