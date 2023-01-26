1. [NAMING] - Name of functions should start with verbs. It will be easier to understand a function's purpose.

BAD EXAMPLE:
```
function averageAges() {}
```

GOOD EXAMPLE:
```
function calculateAverageAge() {}
```

2. [CODE STYLE] - If you move your shortened return statement in arrow function to a newline, use round brackets

BAD EXAMPLE:
```
const humans = people.map((a, b) =>
    a + b);

const babies = people.map(person => children 
 ? a
 : b
```

GOOD EXAMPLE: 
```
const humans = people.reduce((a, b) => (
  a + b
), 0);
```

3. [CODE STYLE] - If you a have a lot of conditions/comparing, move them to a variable

BAD EXAMPLE:
```
if ((a && b === c && d === 'm')
      || (!a && d === 'm')) {

```

GOOD EXAMPLE:
```
const hasMetCondition = a && (b === c)
```

4. [CODE KNOWLEDGE] - Don't use iteration methods to modify an already existing array/object.
(`forEach` is exception). These methods return a new array, so you should use it.

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
