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
  if (!century) {
    const amountMan = people.filter(item => item.sex === 'm').length;

    const sumOld = people.filter(item => item.sex === 'm')
      .reduce((sum, person) =>
        sum + (person.died - person.born), 0);

    return Math.ceil((sumOld / amountMan * 100)) / 100;
  }

  const amountManWithCentery = people.filter(item => item.sex === 'm')
    .filter(value => (Math.ceil(value.died / 100) === century)).length;

  const sumOldWithCentery = people.filter(item => item.sex === 'm')
    .filter(value => (Math.ceil(value.died / 100) === century))
    .reduce((sum, person) =>
      sum + (person.died - person.born), 0);

  return Math.round((sumOldWithCentery / amountManWithCentery * 100)) / 100;
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
  if (!withChildren) {
    const amountWoman = people.filter(item => item.sex === 'f').length;

    const sumOld = people.filter(item => item.sex === 'f')
      .reduce((sum, person) =>
        sum + (person.died - person.born), 0);

    return Math.ceil((sumOld / amountWoman * 100)) / 100;
  }

  const amountWomWithChi = people.filter(item => item.sex === 'f')
    .filter(person => people.some(human => human.mother === person.name)
    );

  const sumOldWithChildren = amountWomWithChi
    .reduce((sum, person) =>
      sum + (person.died - person.born), 0);

  return Math.round((sumOldWithChildren / amountWomWithChi.length) * 100) / 100;
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
  const amountWoman = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const amountChildren = people.filter(person =>
    onlyWithSon
      ? people.some(mother => person.mother === mother.name)
  && person.sex === 'm' : people.some(mother => person.mother === mother.name));

  const age = amountChildren.map(child =>
    child.born - amountWoman.find(mother => mother.name === child.mother).born);

  const countAge = age.reduce((a, b) => a + b, 0);

  return Math.round((countAge / age.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
