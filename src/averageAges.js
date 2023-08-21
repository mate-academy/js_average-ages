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
  const men = century ? people.filter(man => man.sex === 'm'
    && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  return men.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / men.length;
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
  const women = withChildren ? people.filter(woman => people.some(mothers =>
    (woman.name === mothers.mother && woman.sex === 'f'))
  ) : people.filter(woman => woman.sex === 'f');

  return women.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / women.length;
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
  const mothers = people.filter(woman =>
    people.some(mother => (woman.name === mother.mother && woman.sex === 'f')));

  const children = people.filter(child =>
    mothers.some(mother => (child.mother === mother.name)));

  const onlySon = children.filter(son => son.sex === 'm');

  function getAllAge(humans) {
    return humans.map(child =>
      child.born - mothers.find(mom => child.mother === mom.name).born);
  }

  function averageAge(human) {
    return human.reduce((sum, age) => sum + age, 0)
      / human.length;
  };

  const allAgeChildren = getAllAge(children);
  const allAgeOnlySon = getAllAge(onlySon);

  return onlyWithSon ? averageAge(allAgeOnlySon)
    : averageAge(allAgeChildren);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
