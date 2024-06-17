/*function* myGenerator() { 
    let i = 0;
    while(true) { 
        yield i++;
    }
}

let generator = myGenerator();
let generatorValue = generator.next();
console.log(generator);
console.log(generatorValue);
*/

function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
}

const seq = fibonacci();
console.log(seq.next()); // { value: 0, done: false }
console.log(seq.next()); // { value: 1, done: false }
console.log(seq.next()); // { value: 1, done: false }
console.log(seq.next()); // { value: 2, done: false }
console.log(seq.next()); // { value: 3, done: false }

console.log(seq.next().value); // 0
console.log(seq.next().value); // 1
console.log(seq.next().value); // 1
console.log(seq.next().value); // 2
console.log(seq.next().value); // 3




