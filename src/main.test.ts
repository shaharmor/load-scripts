import { Main } from './main';

describe('main', () => {
  describe('.helloWorld()', () => {
    it('exports a function', () => {
      expect(Main.helloWorld()).toEqual('Hello World!');
    });
  });
});
