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
  const finalMale = people.filter(man =>
    century
      ? Math.ceil(man.died / 100) === century && man.sex === 'm'
      : man.sex === 'm'
  );

  const menAges = finalMale.map(man => man.died - man.born);

  const avarageAge = menAges
    .reduce((a, b) => a + b) / menAges.length.toFixed(2);

  return avarageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const finalFemale = people.filter(woman =>
    withChildren
      ? woman.sex === 'f' && people.some(person => person.mother === woman.name)
      : woman.sex === 'f'
  );

  const femaleAges = finalFemale.map(woman => woman.died - woman.born);

  const femaleAverageAge = femaleAges
    .reduce((a, b) => a + b) / femaleAges.length;

  return femaleAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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
  const female = people.filter(woman =>
    woman.sex === 'f'
    && people.some(person => person.mother === woman.name));

  let children;

  onlyWithSon !== undefined
    ? children = people.filter(person => person.sex === 'm'
      && female.find(woman => person.mother === woman.name))
    : children = people.filter(person =>
      female.find(woman => person.mother === woman.name));

  const ages = children.map(child =>
    child.born - female.find(mother => mother.name === child.mother).born);

  return ages.reduce((a, b) => a + b, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
