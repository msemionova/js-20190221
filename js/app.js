import PhonesPage from './components/PhonesPage.js';

new PhonesPage(
    document.querySelector('[data-component="PhonesPage"]')
);


if (false) {

    const API_URL = 'https://mgrinko.github.io/js-20190221/api/phones.json';


    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    const WAITING = 'waiting';
    const SUCCEEDED = 'succeeded';
    const FAILED = 'failed';

    const promise = {
        result: null,
        status: WAITING,
        successCallback: [],
        errorCallbacks: [],

        then(callback) {
            if (this.status === WAITING) {
                this.successCallback.push(callback);
            } else {
                callback(this.result);
            }
        },

        catch(callback) {
            this.errorCallbacks.push(callback);
        },

        succeed(data) {
            if (this.status !== WAITING) return;

            this.status = SUCCEEDED;
            this.result = data;

            for (let callback of this.successCallback) {
                callback(data)
            }
        },
        fail(data) {
            if (this.status !== WAITING) {
                return;
            }

            this.status = FAILED;
            this.result = data;

            for (let callback of this.errorCallbacks) {
                callback(data)
            }
        },
    };

    setTimeout(() => {
        promise.then(data => console.log('Success 3 ' + data));
    }, 5000);

    promise.then((data) => {
        console.log('Success 1 ' + data);
    });
    promise.then((data) => {
        console.log('Success 2 ' + data);
    });
    promise.catch((data) => {
        console.log('Error 1 ' + data);
    });

    promise.succeed(999);
}