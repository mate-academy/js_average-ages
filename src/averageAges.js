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
  const onlyMen = man => {
    return (century)

      ? Math.ceil((man.died / 100)) === century && man.sex === 'm'
      : man.sex === 'm';
  };

  const men = people.filter(onlyMen);

  const totalAge = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0
  );

  return totalAge / men.length;
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
  const onlyWomen = woman => {
    return (withChildren)
      ? people.some(humem => humem.mother === woman.name)
      && woman.sex === 'f'
      : woman.sex === 'f';
  };

  const women = people.filter(onlyWomen);

  const totalAge = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0
  );

  return totalAge / women.length;
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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(women => women.name === person.mother)
    : people.some(women => women.name === person.mother));

  const ageDiffChildAndMother = children.map(item => {
    return item.born - people.find(mother => mother.name === item.mother).born;
  });

  const totalAge = ageDiffChildAndMother.reduce((sum, x) => sum + x, 0);

  return totalAge / ageDiffChildAndMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
