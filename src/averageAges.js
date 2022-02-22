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

  men = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const menAverageAge = men.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / men.length;

  return menAverageAge;
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
  const women = withChildren
    ? (people.filter(person => person.sex === 'f'
  && people.some(child => child.mother === person.name)))
    : (people.filter(person => person.sex === 'f'));

  return women.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / women.length;
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
  const mothers = people.filter(person => person.sex === 'f')
    .filter(x => people.map(person => person.mother).includes(x.name));

  const children = onlyWithSon
    ? (people.filter(kid => kid.sex === 'm'
  && mothers.find(mother => mother.name === kid.mother)))
    : (people.filter(kid =>
      mothers.find(mother => mother.name === kid.mother)));

  const ageDiff = children.map(kid => kid.born - mothers.find(mother =>
    mother.name === kid.mother).born);

  return ageDiff.reduce((sum, diff) =>
    sum + diff) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
