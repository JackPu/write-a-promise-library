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
    function reject(reason) {
        state = 'rejected';
        value = reason;
        if (deferred) {
            handle(deferred);
        }
    }
    function handle(handler) {
        if (state === 'pending') {
            deferred = handler;
            return;
        }

        let handlerCallback;

        if (state === 'resolved') {
            handlerCallback = handler.onResolved;
        } else {
            handlerCallback = handler.onRejected;
        }

        if (!handlerCallback) {
            if (state === 'resolved') {
                handler.resolve(value);
            } else {
                handler.reject(value);
            }
            return;
        }
        setImmediate(() => {
            const ret = handlerCallback(value);
            handler.resolve(ret);
        });

    }
    this.then = function(onResolved, onRejected) {
        return new Promise((resolve, rejected) => {
            handle({
                onResolved,
                onRejected,
                resolve,
                rejected
            });
        });
    };
    fn(resolve, reject);
}

module.exports = JPromise;
