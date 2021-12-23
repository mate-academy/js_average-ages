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
  const sortedMens = people.filter(item => {
    const currentCentury = Math.ceil(item.died / 100);
    const isValidCentury = (!century) ? true : (currentCentury === century);

    return (isValidCentury && (item.sex === 'm'));
  });

  const sumOfAges = sortedMens.reduce((prev, value) => {
    const averageAgeMen = (value.died - value.born) / sortedMens.length;

    return prev + averageAgeMen;
  }, 0);

  return sumOfAges;
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
function calculateWomenAverageAge(people, withChildren) {
  const sortedWomens = people.filter(item => {
    const isHasChildren = people.some(elem => item.name === elem.mother);

    return ((!withChildren || isHasChildren) && (item.sex === 'f'));
  });

  const sumOfAges = sortedWomens.reduce((prev, value) => {
    const averageAgeWomen = (value.died - value.born) / sortedWomens.length;

    return prev + averageAgeWomen;
  }, 0);

  return sumOfAges;
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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const sortedChild = people.filter(item => {
    const isHasMother = people.some(elem => {
      return (onlyWithSon)
        ? item.mother === elem.name && item.sex === 'm'
        : item.mother === elem.name;
    });

    return isHasMother;
  });

  const listOfDiff = sortedChild.map(item => {
    const someMother = people.find(elem => elem.name === item.mother);

    return (item.born - someMother.born);
  });

  const sumOfAges = listOfDiff.reduce((prev, value) => {
    return prev + (value / listOfDiff.length);
  }, 0);

  return sumOfAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
