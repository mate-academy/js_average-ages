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
  const men = [...people].filter((x) => {
    const isMale = (x.sex === 'm');
    let correctCentury = true;

    if (century !== undefined) {
      correctCentury = Math.ceil(x.died / 100) === century;
    }

    return isMale && correctCentury;
  });

  const sumAge = men
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return sumAge / men.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = [...people]
    .filter((human) => {
      const isFemale = human.sex === 'f';
      let hasChildren = true;

      if (withChildren) {
        hasChildren = people.some(person => person.mother === human.name);
      }

      if (isFemale && hasChildren) {
        return true;
      }
    });

  const sumAge = women
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return sumAge / women.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = [...people].filter(person => {
    const hasMother = people.some((human) => human.name === person.mother);
    let withSon = true;

    if (onlyWithSon === true) {
      withSon = person.sex === 'm';
    }

    return (hasMother && withSon);
  });

  const ageDiff = children.reduce((sum, child) => {
    return sum + child.born
        - people.find(mom => mom.name === child.mother).born;
  }, 0);

  return ageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
