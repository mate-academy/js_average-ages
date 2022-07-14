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
  let totalAge = 0;

  const men = people.filter(persone =>
    persone.sex === 'm');

  let menByCentury;

  typeof century === 'undefined'
    ? menByCentury = men
    : menByCentury = men.filter(human =>
      century === Math.ceil(human.died / 100));

  totalAge = menByCentury.map(human =>
    human.died - human.born).reduce((a, b) => (a + b), 0);

  return totalAge / menByCentury.length;
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
  let totalAge = 0;

  const females = people.filter(human => human.sex === 'f');

  const mothersList = people.map(human => human.mother);

  const femalesWithChildren = females.filter(human =>
    mothersList.some(mother => mother === human.name));

  const womens = (typeof withChildren === 'undefined')
    ? females
    : femalesWithChildren;

  totalAge = womens.map(human =>
    human.died - human.born).reduce((a, b) => (a + b), 0);

  return totalAge / womens.length;
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
  let children = 0;

  typeof onlyWithSon === 'undefined'
    ? children = people.filter(human =>
      people.find(mama => human.mother === mama.name))
    : children = people.filter(human => human.sex === 'm'
    && people.find(mama => human.mother === mama.name));

  const totalDifference = children.reduce((previous, current) =>
    previous + current.born - people.find(human =>
      current.mother === human.name).born, 0);

  return totalDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
