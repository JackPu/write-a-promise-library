function JPromise(fn) {
    let state = 'pending';
    let deferred = null;
    let value = null;
    function resolve(newVal) {
        value = newVal;
        state = 'resolved';
        if (deferred) {
            handle(deferred);
        }
    }
    function handle(handler) {
        if (!handler.onResolved) {
            handler.resolve(value);
            return;
        }

        const ret = handler.onResolved(value);
        handler.resolve(ret);
    }
    this.then = function(onResolved) {
        return new Promise((resolve) => {
            handle({
                onResolved,
                resolve,
            });
        });
    };
    fn(resolve);
}

module.exports = JPromise;
