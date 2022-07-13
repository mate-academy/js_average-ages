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
  let average = 0;

  if (century) {
    const MenSexAndCentury = people.filter(human => human.sex === 'm'
          && century === Math.ceil(human.died / 100));

    totalAge = MenSexAndCentury.map(human =>
      human.died - human.born).reduce((a, b) => (a + b), 0);

    average = totalAge / MenSexAndCentury.length;

    return average;
  }

  const MenSex = people.filter(human => human.sex === 'm');

  totalAge = MenSex.map(human =>
    human.died - human.born).reduce((a, b) => (a + b), 0);

  average = totalAge / MenSex.length;

  return average;
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
  // write code here

  let totalAge = 0;
  let average = 0;

  if (withChildren) {
    const mothers = [];

    for (const human of people) {
      mothers.push(human.mother);
    }

    const femalesWithChildren = people.filter(human =>
      human.sex === 'f' && mothers.some(mother => mother === human.name));

    totalAge = femalesWithChildren.map(human =>
      human.died - human.born).reduce((a, b) => (a + b), 0);

    average = totalAge / femalesWithChildren.length;

    return average;
  }

  const females = people.filter(human => human.sex === 'f');

  totalAge = females.map(human =>
    human.died - human.born).reduce((a, b) => (a + b), 0);

  average = totalAge / females.length;

  return average;
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
  let average = 0;

  if (onlyWithSon) {
    children = people.filter(human => human.sex === 'm'
      && people.find(mama => human.mother === mama.name));
  } else {
    children = people.filter(human =>
      people.find(mama => human.mother === mama.name));
  }

  const totalDifference = children.reduce((previous, current) =>
    previous + current.born - people.find(human =>
      current.mother === human.name).born, 0);

  average = totalDifference / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
