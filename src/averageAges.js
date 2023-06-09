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
  const cemetery = century === undefined
    ? people.filter(human =>
      human.sex === 'm')
    : people.filter(human =>
      Math.ceil(human.died / 100) === century
      && human.sex === 'm');

  return cemetery.reduce((ageOfAllMen, man) =>
    ageOfAllMen + (man.died - man.born), 0) / cemetery.length;
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
  const mothers = people.map(human => human.mother);
  const women = !withChildren
    ? people.filter(human => human.sex === 'f')
    : people.filter(human => human.sex === 'f'
      && mothers.includes(human.name));

  return women.reduce((ageOfAllWoman, woman) =>
    ageOfAllWoman + (woman.died - woman.born), 0) / women.length;
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
  const kids = onlyWithSon
    ? people.filter(kid => people.some(mom => mom.name === kid.mother
      && kid.sex === 'm'))
    : people.filter(kid => people.some(mom => mom.name === kid.mother));

  const averageAges = kids.map(kid => {
    return kid.born - people.find(mom => mom.name === kid.mother).born;
  });

  return averageAges.reduce((prev, age) => prev + age, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
