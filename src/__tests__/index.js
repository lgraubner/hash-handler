import hashHandler from '../';

test('should default export a function', () => {
  expect(hashHandler).toBeInstanceOf(Function);
});

describe('hashHandler#', () => {
  let hash;

  beforeEach(() => {
    hash = hashHandler();
  });

  afterEach(() => {
    hash.destroy();
  });

  describe('get()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('get');
      expect(hash.get).toBeInstanceOf(Function);
    });
  });
});
