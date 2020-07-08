export default function setupIntersectionObserverMock({observe = () => null, unobserve = () => null} = {}) {
  class IntersectionObserver {
    constructor(){
      this.observe = observe;
      this.unobserve = unobserve;
    }
  }
  Object.defineProperty(
    window,
    'IntersectionObserver',
    { writable: true, configurable: true, value: IntersectionObserver }
  );
  Object.defineProperty(
    global,
    'IntersectionObserver',
    { writable: true, configurable: true, value: IntersectionObserver }
  );
}