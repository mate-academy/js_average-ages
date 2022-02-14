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
  const men = people.filter(man => man.sex === 'm');
  const menCentury = men.filter(x => century === Math.ceil(x.died / 100));
  let ages = [];

  !century ? ages = men.map(man => man.died - man.born)
    : ages = menCentury.map(man => man.died - man.born);

  const sum = ages.reduce((prev, next) => prev + next);
  const result = sum / ages.length;

  return result;
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
  const women = people.filter(woman => woman.sex === 'f');
  const allMothers = people.map(mom => mom.mother);
  const mothers = women.filter(mom => allMothers.includes(mom.name));
  let ages = [];

  !withChildren ? ages = women.map(woman => woman.died - woman.born)
    : ages = mothers.map(woman => woman.died - woman.born);

  const sum = ages.reduce((prev, next) => prev + next);
  const result = sum / ages.length;

  return result;
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
  const kids = people.filter(
    kid => people.some(mom => kid.mother === mom.name)
  );
  const sons = people.filter(
    son => son.sex === 'm' && people.some(mom => son.mother === mom.name)
  );

  let age = 0;

  !onlyWithSon
    ? age = kids.reduce((prev, next) => prev + (
      next.born - people.find(mother => next.mother === mother.name).born
    ), 0) / kids.length
    : age = sons.reduce((prev, next) => prev + (
      next.born - people.find(mother => next.mother === mother.name).born
    ), 0) / sons.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
