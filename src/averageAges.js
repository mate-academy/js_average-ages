'use strict';

function averageYears(people) {
  const arrayLength = people.length;

  return people
    .map(person => person.died - person.born)
    .reduce((acc, year) => acc + year) / arrayLength;
};

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
  const menDied = people.filter(person => person.sex === 'm' && (!century
    || century === Math.ceil(person.died / 100)));

  return averageYears(menDied);
};
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
  const woman = people.filter(person => person.sex === 'f'
  && (!withChildren || people.some(human => person.name === human.mother)));

  return averageYears(woman);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * Функція повертає середню різницю у віці між дитиною та його або її
 * мати в масиві. (Вік матері на момент народження дитини)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 * --
 * Якщо вказано `onlyWithSon`, функція обчислює лише різницю у віці
 * для синів та їхніх матерів.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const childrenWithMother = people.filter(child => {
    const hasMother = people.some(person => person.name === child.mother);
    const isSon = child.sex === 'm';

    return onlyWithSon ? hasMother && isSon : hasMother;
  });

  const AverageAgeDiff = childrenWithMother.reduce((acc, child) => {
    const motherBorn = people
      .find(mother => mother.name === child.mother)
      .born;

    const ageDifference = child.born - motherBorn;

    return acc + ageDifference;
  }, 0);

  return AverageAgeDiff / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
