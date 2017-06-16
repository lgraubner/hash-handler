import hashHandler from '../';

test('should default export a function', () => {
  expect(typeof hashHandler).toBe('function');
});

describe('hashHandler#', () => {
  let hash;

  beforeEach(() => {
    hash = hashHandler();

    global.location = {
      hash: '',
    };
  });

  afterEach(() => {
    hash.destroy();
  });

  describe('get()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('get');
      expect(typeof hash.get).toBe('function');
    });

    test('should return empty object', () => {
      expect(typeof hash.get()).toBe('object');
    });

    test('should parse query string correctly', () => {
      global.location.hash = '#foo=bar&num';
      expect(hash.get()).toMatchObject({
        foo: 'bar',
        num: null,
      });
    });
  });

  describe('set()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('set');
      expect(typeof hash.set).toBe('function');
    });

    test('should create query string', () => {
      hash.set({
        foo: 'bar',
        num: null,
      });

      expect(global.location.hash).toBe('#foo=bar&num');
    });

    test('should extend existing query string', () => {
      global.location.hash = '#foo=bar&num=2';

      hash.set({
        num: 5,
      });

      expect(global.location.hash).toBe('#foo=bar&num=5');
    });

    test('should sort query string in alphabetical order', () => {
      global.location.hash = '#b';

      hash.set({
        a: null,
      });

      expect(global.location.hash).toBe('#a&b');
    });
  });

  describe('replace()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('replace');
      expect(typeof hash.replace).toBe('function');
    });

    test('should create query string', () => {
      hash.replace({
        foo: 'bar',
        num: null,
      });

      expect(global.location.hash).toBe('#foo=bar&num');
    });

    test('should overwrite existing query string', () => {
      global.location.hash = '#foo=bar&num=2';

      hash.replace({
        num: 5,
      });

      expect(global.location.hash).toBe('#num=5');
    });

    test('should accept string', () => {
      hash.replace('foo');

      expect(global.location.hash).toBe('#foo');
    });
  });

  describe('clear()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('clear');
      expect(typeof hash.clear).toBe('function');
    });

    test('should remove query string', () => {
      global.location.hash = '#foo=bar';

      hash.clear();
      expect(global.location.hash).toBe('');
    });
  });

  describe('registerListener()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('registerListener');
      expect(typeof hash.registerListener).toBe('function');
    });
  });

  describe('removeListener()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('removeListener');
      expect(typeof hash.removeListener).toBe('function');
    });
  });

  describe('destroy()', () => {
    test('should be a function', () => {
      expect(hash).toHaveProperty('destroy');
      expect(typeof hash.destroy).toBe('function');
    });
  });
});
