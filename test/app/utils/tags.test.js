import { expect } from 'chai';

import { tagByPrefix, tagByPrefixStripped } from '../../../app/utils/tags';

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

});
