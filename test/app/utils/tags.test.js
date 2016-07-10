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

    it('sorts 5 rows by the "created:" tag prefix (tags/plaintags key names, different-length created:... timestamps)', function () {
      let r1 = {tags:      ['created:20160610072200532059799']};
      let r2 = {plaintags: ['created:20160710072200']};
      let r3 = {plaintags: ['created:20160720072200532059799']};
      let r4 = {tags:      ['created:20160721072200532059799']};
      let r5 = {plaintags: ['created:20160722172200']};

      expect([r2, r4, r3, r1, r5].sort(sortRowByCreated)).to.deep.equal([r1, r2, r3, r4, r5]);
    });

    it('sorts 6 real-life rows by the "created:" tag prefix that were showing up out of order', function () {
      let r1 = {tags: ["id:07e82759-6485-42e2-4c03-41dffe877994", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091750425688201", "all"]};
      let r2 = {tags: ["id:e3bd1f9f-3405-48f1-5d97-150d56405165", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091755166992796", "all"]};
      let r3 = {tags: ["id:d00fc3ec-e43f-4bbe-750d-12bdddcdf3db", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091757186400574", "all"]};
      let r4 = {tags: ["id:3432b953-e510-4b31-5b63-443bfd0a36e2", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091758220587435", "all"]};
      let r5 = {tags: ["id:b217ed51-b8f3-4e67-6f1c-ff7cc1406590", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091759279885694", "all"]};
      let r6 = {tags: ["id:eb2dbde9-162a-4fa9-5ad8-e9eb3599e124", "parentrow:id:6e781cb1-923c-45d4-6653-91c731bff0e1", "from:steve", "type:chatmessage", "app:backchannel", "created:20160710091800476774128", "all"]};

      expect([r6, r2, r4, r3, r1, r5].sort(sortRowByCreated)).to.deep.equal([r1, r2, r3, r4, r5, r6]);
    });
  });

});
