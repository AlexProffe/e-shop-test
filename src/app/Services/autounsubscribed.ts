export function AutoUnsubscribe(): Function {
  return (constructor): void => {
    const orig = constructor.prototype.ngOnDestroy;
    // eslint-disable-next-line no-param-reassign,func-names
    constructor.prototype.ngOnDestroy = function () {
      if (this.unsubscribeStream$) {
        this.unsubscribeStream$.next();
        this.unsubscribeStream$.complete();
      }
      if (orig) {
        orig.apply(this);
      }
    };
  };
}
