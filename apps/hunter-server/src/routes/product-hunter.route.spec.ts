import { productRouter } from './product-hunter.route';

describe('should teset for product hunter route', () => {
  test('test product-hunter route', () => {
    const routes = [{ path: '/:publicDate', method: 'get' }];

    routes.forEach((route) => {
      const match = productRouter.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
