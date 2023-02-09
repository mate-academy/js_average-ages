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

const findAverage = (people) => {
  return people
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  return findAverage(
    people.filter(person =>
      isFinite(century)
        ? person.sex === 'm'
        && Math.ceil(person.died / 100) === century
        : person.sex === 'm'
    )
  );
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
  return findAverage(
    people.filter(person =>
      withChildren
        ? people.some(child => child.mother === person.name)
        : person.sex === 'f'
    )
  );
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
  let mother;
  const children = people.filter(kid =>
    onlyWithSon
      ? kid.sex === 'm'
        && people.find(person => person.name === kid.mother)
      : people.find(person => person.name === kid.mother)
  );

  return children.reduce((sum, kid) => {
    mother = people.find(person => person.name === kid.mother);

    return sum + kid.born - mother.born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
