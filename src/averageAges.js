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
function calculateMenAverageAge(people, century = 0) {
  const isMan = (person) => (person.sex === 'm');
  const isAppropriateMan = (person) => (isMan(person)
   && Math.ceil(person.died / 100) === century);
  const man = people.filter(century ? isAppropriateMan : isMan);

  return man.reduce((a, b) => a + b.died - b.born, 0) / man.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const isWoman = (person) => (person.sex === 'f');
  const isWomanWithChildren = (person) => (isWoman(person)
    && people.some(a => a.mother === person.name));
  const women = people.filter(withChildren ? isWomanWithChildren : isWoman);

  return women.reduce((a, b) => (a + b.died - b.born), 0) / women.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const isChild = (person) => (people.some(a => a.name === person.mother));
  const isSon = (person) => (isChild(person) && person.sex === 'm');
  const kid = people.filter(onlyWithSon ? isSon : isChild);
  const mothers = people.filter(b => kid.some(a => a.mother === b.name));
  const ma = (person) => (mothers.find(a => a.name === person.mother));

  return kid.map(a => a.born - ma(a).born).reduce((a, b) => a + b) / kid.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
