(function ($) {
  module('jQuery#karlGroves', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.karlGroves(), this.elems, 'should be chainable');
  });

  test('is karlGroves', function () {
    expect(1);
    strictEqual(this.elems.karlGroves().text(), 'karlGroves0karlGroves1karlGroves2', 'should be karlGroves');
  });

}(jQuery));
