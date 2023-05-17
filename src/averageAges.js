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

const calculateAverages = (ages, count) => ages.reduce(
  (sum, age) => (sum + age), 0) / count;

function calculateMenAverageAge(people, century) {
  const mans = people.filter(person => {
    return century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm';
  }
  );
  const ages = mans.map(person => person.died - person.born);

  return calculateAverages(ages, ages.length);
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
  const womens = people.filter(person => {
    return withChildren
      ? people.some(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f';
  }
  );

  const ages = womens.map(woman => woman.died - woman.born);

  return calculateAverages(ages, ages.length);
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
  const children = people.filter(person => {
    const mom = people.find(mother => person.mother === mother.name);

    return mom && (onlyWithSon ? person.sex === 'm' : true);
  });

  const ageDifference = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return (child.born - mother.born);
  });

  return calculateAverages(ageDifference, ageDifference.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
