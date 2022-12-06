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
  let men;

  if (century) {
    men = people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    );
  } else {
    men = people.filter(person => person.sex === 'm');
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
  let women;

  if (withChildren) {
    women = people.filter(person => person.sex === 'f');

    women = women.filter(
      woman => people.some(child => child.mother === woman.name)
    );
  } else {
    women = people.filter(person => person.sex === 'f');
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
  let women = people.filter(person => person.sex === 'f');

  const sons = people.filter(
    person => person.sex === 'm' && person.mother !== null
  );

  let childbirthAge;

  if (onlyWithSon) {
    women = women.filter(
      woman => sons.some(son => son.mother === woman.name)
    );

    childbirthAge = women.map(
      woman => sons.find(son => son.mother === woman.name).born - woman.born
    );
  } else {
    women = women.filter(
      woman => people.some(child => child.mother === woman.name)
    );

    childbirthAge = women.map(
      woman => people.find(
        child => child.mother === woman.name).born - woman.born
    );
  }

  const sumOfAges = childbirthAge.reduce((prev, x) => prev + x, 0);

  return sumOfAges / childbirthAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
