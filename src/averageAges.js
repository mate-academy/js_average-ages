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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredMen = century
    ? people
      .filter(({ sex, died }) => {
        const isPersonCentury = Math.ceil(died / 100) === century;
        const isMan = sex === 'm';

        return isMan && isPersonCentury;
      })
    : people
      .filter(({ sex }) => sex === 'm');

  const totalAge = filteredMen
    .reduce((overallAge, man) => overallAge + man.died - man.born, 0);

  const menCount = filteredMen.length;

  return Math.round((totalAge / menCount) * 100) / 100;
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
  const filteredWomen = withChildren
    ? people.filter((woman) => {
      const isMother = people.some(person => person.mother === woman.name);
      const isWoman = woman.sex === 'f';

      return isWoman && isMother;
    })
    : people.filter(({ sex }) => sex === 'f');

  const totalAge = filteredWomen
    .reduce((overallAge, woman) => overallAge + woman.died - woman.born, 0);

  const womenCount = filteredWomen.length;

  return Math.round((totalAge / womenCount) * 100) / 100;
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
  const filteredChildren = onlyWithSon
    ? people.filter(person => {
      const hasMother = person.mother !== null;
      const hasMotherData = people
        .find(mother => mother.name === person.mother) !== undefined;
      const isSon = person.sex === 'm';

      return hasMother && hasMotherData && isSon;
    })
    : people.filter(person => {
      const hasMother = person.mother !== null;
      const hasMotherData = people
        .find(mother => mother.name === person.mother) !== undefined;

      return hasMother && hasMotherData;
    });

  const totalDifference = filteredChildren.reduce((totalDiff, child) => {
    const mother = people.find(person => person.name === child.mother);

    return totalDiff + (child.born - mother.born);
  }, 0);

  const childrenCount = filteredChildren.length;

  return Math.round(totalDifference / childrenCount * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
