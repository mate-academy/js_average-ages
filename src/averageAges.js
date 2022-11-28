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
const isMale = person => person.sex === 'm';
const isFemale = person => person.sex === 'f';

const calculateAverage = (ages) => {
  const sumOfAge = ages
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0);

  return sumOfAge / ages.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? isMale(person) && Math.ceil(person.died / 100) === century
      : isMale(person)
  );

  return calculateAverage(men);
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
  const women = people.filter(person =>
    withChildren
      ? isFemale(person) && people.some(child => child.mother === person.name)
      : isFemale(person)
  );

  return calculateAverage(women);
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.some(person => child.mother === person.name) && isMale(child)
      : people.some(person => child.mother === person.name)
  );

  const ageDiff = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
