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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const ages = men.map(man => man.died - man.born);
  const sumOfAges = ages.reduce((prev, x) => prev + x, 0);

  return sumOfAges / ages.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(
      woman => people.some(child => child.mother === woman.name)
    );
  }

  const ages = women.map(woman => woman.died - woman.born);
  const sumOfAges = ages.reduce((prev, x) => prev + x, 0);

  return sumOfAges / ages.length;
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
  const women = people.filter(person => person.sex === 'f');

  const sons = people.filter(
    person => person.sex === 'm' && person.mother !== null
  );

  let ageDiff;

  if (onlyWithSon) {
    ageDiff = sons
      .filter(son => women.some(woman => woman.name === son.mother))
      .map(son => son.born - women.find(
        woman => woman.name === son.mother).born
      );
  } else {
    ageDiff = people
      .filter(person => women.some(woman => woman.name === person.mother))
      .map(person => person.born - women.find(
        woman => woman.name === person.mother).born
      );
  }

  const sumOfAges = ageDiff.reduce((prev, x) => prev + x, 0);

  return sumOfAges / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
