import chai, { expect } from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';

import hashHandler from '../';

chai.use(sinonChai);

it('should default export a function', () => {
  expect(hashHandler).to.be.a('function');
});

describe('hashHandler#', () => {
  let hash;

  stub(window, 'hash');

  beforeEach(() => {
    hash = hashHandler();
  });

  afterEach(() => {
    hash.destroy();
  });

  describe('get()', () => {
    it('should be a function', () => {
      expect(hash).to.have.property('get').that.is.a('function');
    });
  });
});
