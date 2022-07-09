'use strict';

/**
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
  const countAge = (counter, person) => {
    counter.averageAge += (person.died - person.born);
    counter.count++;
  };

  const averageValue = (average) =>
    Math.round((average.averageAge / average.count * 100)) / 100;

  const sumOfAges = people.reduce((counter, person) => {
    century
      ? (person.sex === 'm')
        && (Math.ceil(person.died / 100) === century)
        && countAge(counter, person)
      : (person.sex === 'm') && countAge(counter, person);

    return counter;
  }, {
    averageAge: 0,
    count: 0,
  });

  return averageValue(sumOfAges);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const countAge = (counter, person) => {
    counter.averageAge += (person.died - person.born);
    counter.count++;
  };

  const averageValue = (average) =>
    Math.round((average.averageAge / average.count * 100)) / 100;

  const isMother = (person) =>
    people.some((human) => human.mother === person.name);

  const sumOfAges = people.reduce((counter, person) => {
    withChildren
      ? (person.sex === 'f') && isMother(person) && countAge(counter, person)
      : (person.sex === 'f') && countAge(counter, person);

    return counter;
  }, {
    averageAge: 0,
    count: 0,
  });

  return averageValue(sumOfAges);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter((child) => child.mother && child.sex === 'm')
    : people.filter((child) => child.mother);

  function sumDiff(sum, child, mother) {
    sum.averageAge += child.born - mother.born;
    sum.count++;

    return sum;
  }

  const agesDiff = children.reduce((sum, child) => {
    const mother = people.find(person => child.mother === person.name);

    mother && sumDiff(sum, child, mother);

    return sum;
  }, {
    averageAge: 0,
    count: 0,
  });

  function averageValue() {
    return Math.round(agesDiff.averageAge / agesDiff.count * 100) / 100;
  }

  return averageValue();
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
