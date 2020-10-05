'use strict';

/*
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const menLength = people.filter(person => person.sex === 'm')
    .length;

  const menCenturyLength = people.filter(person =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century)
    .length;

  const menAgeSum = people.reduce((acc, person) =>
    person.sex === 'm'
      ? acc + (person.died - person.born)
      : acc + 0
  , 0);

  const menAverage = menAgeSum / menLength;

  const menAgeCentury = people.reduce((acc, person) =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century
      ? acc + (person.died - person.born)
      : acc + 0
  , 0);

  const menAverageCentury = menAgeCentury / menCenturyLength;

  return century ? menAverageCentury : menAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with personren
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenMap = people.filter(person => person.sex === 'f');

  const womenLength = womenMap.length;

  const womenAgeSum = womenMap.reduce((acc, woman) =>
    acc + (woman.died - woman.born), 0);

  const womenAverage = womenAgeSum / womenLength;

  const womenWithChildren = withChildren
    ? womenMap.filter(woman => {
      return people.find(person => woman.name === person.mother);
    })
    : womenMap;

  const womenWithChildrenAverage = womenWithChildren.reduce((acc, woman) =>
    acc + (woman.died - woman.born), 0) / womenWithChildren.length;

  return withChildren ? womenWithChildrenAverage : womenAverage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * person in the array. (A mother's age at person birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenMap = people.filter(person => person.sex === 'f');

  const womenWithChild = womenMap.filter(woman => {
    return people.find(person =>
      woman.name === person.mother);
  });

  const averageAge = [];

  if (onlyWithSon) {
    womenWithChild.map(woman => people.map(person => {
      if (person.sex === 'm' && person.mother === woman.name) {
        averageAge.push(person.born - woman.born);
      }
    }));
  } else {
    womenWithChild.map(woman => people.map(person => {
      if (person.mother === woman.name) {
        averageAge.push(person.born - woman.born);
      }
    }));
  }

  return averageAge.reduce((sum, age) => sum + age, 0) / averageAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
