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
function isMan(array, condition) {
  return array.filter(person => condition
    ? person.sex === 'm' && Math.ceil(person.died / 100) === condition
    : person.sex === 'm'
  );
}

function calculateMenAverageAge(people, century) {
  const mans = isMan(people, century);

  const ages = mans.map(person => person.died - person.born);
  const average = ages.reduce((prev, next) => prev + next, 0) / ages.length;

  return average;
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

function isWomen(array, condition) {
  return array.filter(person => condition
    ? array.some(human => human.mother === person.name)
    : person.sex === 'f'
  );
}

function calculateWomenAverageAge(people, withChildren) {
  const women = isWomen(people, withChildren);

  const womensAges = women.map(person => person.died - person.born);
  const average = womensAges
    .reduce((prev, curr) => prev + curr, 0) / womensAges.length;

  return average;
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

function isOnlyWithSon(array, condition) {
  return condition
    ? array.filter(person =>
      array.some(mother =>
        mother.name === person.mother && person.sex === 'm'))
    : array.filter(person =>
      array.some(mother =>
        mother.name === person.mother)
    );
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = isOnlyWithSon(people, onlyWithSon);

  const ages = children.map(person => {
    const mother = people.find(moth => person.mother === moth.name);

    return person.born - mother.born;
  });

  const average = ages
    .reduce((prev, curr) => prev + curr, 0) / ages.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
