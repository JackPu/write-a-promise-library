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
    function handle(onResolved) {
        if (state === 'pending') {
            deferred = onResolved;
            return;
        }
        onResolved(value);
    }
    this.then = function(onResolved) {
        handle(onResolved);
    };
    fn(resolve);
}

module.exports = JPromise;
