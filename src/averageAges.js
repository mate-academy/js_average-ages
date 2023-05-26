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
  const men = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  return getAverageAge(men);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(person => person.sex === 'f');

  if (!withChildren) {
    return getAverageAge(women);
  }

  const mothers = women.filter(woman => people
    .some(person => person.mother === woman.name)
  );

  return getAverageAge(mothers);
}

function getAverageAge(sourceArray) {
  const totalAge = sourceArray
    .reduce((acc, person) => acc + person.died - person.born, 0);

  return totalAge / sourceArray.length;
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
  const women = [];
  const men = [];

  people.forEach(person => {
    if (!person.sex) {
      return;
    }

    if (person.sex === 'm') {
      men.push(person);
    } else {
      women.push(person);
    }
  });

  const sourcePeopleArr = onlyWithSon ? men : people;
  let totalAgeDiff = 0;
  let matchesCount = 0;

  sourcePeopleArr.forEach(person => {
    const personMother = women.find(woman => woman.name === person.mother);

    if (personMother) {
      matchesCount++;
      totalAgeDiff += person.born - personMother.born;
    }
  });

  return totalAgeDiff / matchesCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
