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

  describe('set()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('set');
      expect(hash.set).toBeInstanceOf(Function);
    });
  });

  describe('replace()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('replace');
      expect(hash.replace).toBeInstanceOf(Function);
    });
  });

  describe('clear()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('clear');
      expect(hash.clear).toBeInstanceOf(Function);
    });
  });

  describe('registerListener()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('registerListener');
      expect(hash.registerListener).toBeInstanceOf(Function);
    });
  });

  describe('removeListener()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('removeListener');
      expect(hash.removeListener).toBeInstanceOf(Function);
    });
  });

  describe('destroy()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('destroy');
      expect(hash.destroy).toBeInstanceOf(Function);
    });
  });
});
