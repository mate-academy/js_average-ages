'use strict';

// declare a function which finds an average value from array with numbers.
function countAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length; // output: number;
}

// declare a function which counts the age
// of person from array with people data.
function getAges(people) {
  return people.map(person => person.died - person.born);
  // output: array with ages;
}

// declare a function which returns average age of men in array.
function calculateMenAverageAge(people, century) {
  const MenAverage = people
    .filter(person => person.sex === 'm') // find onle men from array;
    .filter(person => !century || century === Math.ceil(person.died / 100));
    // find all men who died in this century;
  const ages = getAges(MenAverage);

  return countAverage(ages); // output: number;
}

// declare a function which returns average age of women in array.
function calculateWomenAverageAge(people, withChildren) {
  // find all women who are mothers from array.
  const motherArray = people
    .map(person => person.mother)
    .filter(name => name !== null);

  // find all women without children;
  const womenAvg = people
    .filter(person => person.sex === 'f')
    .filter(person => !withChildren || motherArray.includes(person.name));

  const ages = getAges(womenAvg);

  return countAverage(ages); // output: number;
}

// declare a function which returns an average age
// difference between a child and his or her mother in the array.
function calculateAverageAgeDiff(people, onlyWithSon) {
  // filter all children in array;
  const childrenOnly = people.filter((child) =>
    onlyWithSon
      ? people.find(
        (person) => child.mother === person.name && child.sex === 'm'
      )
      : people.find((person) => child.mother === person.name)
  );

  // calculate age difference;
  const differenceAges = childrenOnly
    .map(
      (child) =>
        child.born - people.find((mother) => mother.name === child.mother).born
    );
  const ages = countAverage(differenceAges);

  return ages; // output: number;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
