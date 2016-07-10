import { expect } from 'chai';

import { tagByPrefix, tagByPrefixStripped, sortRowByCreated } from '../../../app/utils/tags';

describe('Tag Utilities', function() {

  describe('#tagByPrefix', function() {
    it('returns an empty string for no plaintags passed', function () {
      expect(tagByPrefix([], 'prefix')).to.equal('');
    });

    it('returns first value matching the provided prefix', function () {
      expect(tagByPrefix(['prefix:suffix', 'prefix:suffix2'], 'prefix:')).to.equal('prefix:suffix');
    });

    it('returns empty string for tag for a provided prefix', function () {
      expect(tagByPrefix(['prefix:suffix'], 'nope')).to.equal('');
    });
  });

  describe('#tagByPrefixStripped', function() {
    it('returns the suffix for a given tag pair', function () {
      expect(tagByPrefixStripped(['prefix:suffix', 'prefix:suffix2'], 'prefix:')).to.equal('suffix');
    });

    it('returns empty value for prefix that does not match', function () {
      expect(tagByPrefixStripped(['prefix:suffix', 'prefix:suffix2'], 'nope')).to.equal('');
    });
  });

  describe('#sortRowByCreated', function() {
    it('sorts 2 rows by the "created:" tag prefix where one time is in seconds, the other, nanoseconds', function () {
      let r1 = {plaintags: ['created:20160710072200']};
      let r2 = {plaintags: ['created:20160710072200532059799']};

      expect([r2, r1].sort(sortRowByCreated)).to.deep.equal([r1, r2]);
    });

    it('sorts 3 rows by the "created:" tag prefix (all in seconds)', function () {
      let r1 = {plaintags: ['created:20160710064632']};
      let r2 = {plaintags: ['created:20160710072200']};
      let r3 = {plaintags: ['created:20160810072200']};

      expect([r2, r3, r1].sort(sortRowByCreated)).to.deep.equal([r1, r2, r3]);
    });

    it('sorts 5 rows by the "created:" tag prefix (different )', function () {
      let r1 = {tags:      ['created:20160610072200532059799']};
      let r2 = {plaintags: ['created:20160710072200']};
      let r3 = {plaintags: ['created:20160720072200532059799']};
      let r4 = {tags:      ['created:20160721072200532059799']};
      let r5 = {plaintags: ['created:20160722172200']};

      expect([r2, r4, r3, r1, r5].sort(sortRowByCreated)).to.deep.equal([r1, r2, r3, r4, r5]);
    });
  });

});
