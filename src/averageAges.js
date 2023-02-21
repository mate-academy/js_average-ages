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

function getAverageAge(humans) {
  const averageAges = humans.reduce(
    (sum, { born, died }) => sum + (died - born),
    0);

  return averageAges / humans.length;
}

function calculateMenAverageAge(people, century) {
  const menFilterFunction = (person) => {
    const isMan = person.sex === 'm';
    const isCentury = Math.ceil(person.died / 100) === century;

    return isMan && (century
      ? isCentury
      : true);
  };

  const filteredMan = people.filter(menFilterFunction);

  return getAverageAge(filteredMan);
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
  const womanFilterFunction = (person) => {
    const isWoman = person.sex === 'f';

    const isWithChildren = people.some(
      human => person.name === human.mother
    );

    return isWoman && (withChildren
      ? isWithChildren
      : true);
  };

  const filteredWomen = people.filter(womanFilterFunction);

  return getAverageAge(filteredWomen);
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
  const children = people.filter(person =>
    people.some(mother => (
      mother.name === person.mother && (
        onlyWithSon
          ? person.sex === 'm'
          : true
      )
    )));

  const averageDiff = children.reduce((sum, person) => {
    const mother = people.find(woman => woman.name === person.mother);

    return sum + (person.born - mother.born);
  }, 0);

  return averageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
