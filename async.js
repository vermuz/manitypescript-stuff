//-----------------------
// MAKE A function Async
//-----------------------

async function foo() {
}

const bar = async() => {
}

class Baz {
    async qux() {

    }
}

// Async function notes
// ------------------------------------------
// An async function always returns a promise
// Promise resolves to the value returned by the function

foo().then(value => {
    console.log(value);
});


async function foo() {
    return 122;
}

// Now the promise will resolve to that value

// Body of an Async Function
// --------------------------

// Three promises
const notAPromse = 432;
const promiseThatWillResolve = new Promise(res => res(123));
const promiseThatWillReject = new Promise((res, rej) => rej(new Error('Hello')));

// Async functions get access to the await in the function bodies
async function foo() {
    const res1 = await notAPromse;
    // If variable is not a promise, value returned is same as the variable
    console.log({ forNotAPromise: res1 }); // output -> 432
    const res2 = await promiseThatWillResolve;
    // In this case execution will pause until the fate of the promise
    // is determined.
    console.log({ promiseThatWillResolve: res2 }); // output -> 123
    // If the promise resolves, value of await is the resolve value
    // of promise
    try {
        const res3 = await promiseThatWillReject;
        // If the variable is a promise that gets rejected
        // await method will throw an error in the body of the async function
        console.log('I will never get called as error is thrown');
    }
    catch(e) {
        // on rejection no more statements are executed unless there is a
        // a catch construct.
        console.log({ forPromiseThatWillReject: e.message }); // output -> "Hello"
    }
}

foo();

// Async allows you to use your synchronous code writing skills
// to write asynchronous code
//-----------------------
// If a promise takes sometime to settle its state
// Execution of the await operator pauses until the await returns

async function foo() {
    console.log('Waiting 5 seconds');
    await new Promise(res => setTimeout(res, 5000));
    console.log('Done Waiting');
}

foo();
