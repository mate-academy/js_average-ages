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
  const mensDiedInCurrentCentury = people.filter(person => {
    if (century) {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    } else {
      return person.sex === 'm';
    }
  });

  const sumOfAges = mensDiedInCurrentCentury.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  const avg = sumOfAges / mensDiedInCurrentCentury.length;

  return avg;
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
  const women = people.filter(person => {
    if (withChildren) {
      const hasChildren = people.some(pers => pers.mother === person.name);

      return person.sex === 'f' && hasChildren;
    } else {
      return person.sex === 'f';
    }
  });

  const sumOfAges = women.reduce((sum, woman) => {
    return sum + (woman.died - woman.born);
  }, 0);

  const avg = sumOfAges / women.length;

  return avg;
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
  const mothers = people.filter(person => {
    if (onlyWithSon) {
      const hasSon = people.some(pers =>
        pers.mother === person.name && pers.sex === 'm');

      return person.sex === 'f' && hasSon;
    } else {
      const hasChildren = people.find(pers => pers.mother === person.name);

      return person.sex === 'f' && hasChildren;
    }
  });

  let countOfChildrens = 0;

  const sumOfDifferences = mothers.reduce((sum, mother) => {
    let childrens = [];

    if (onlyWithSon) {
      childrens = [...people].filter(pers => pers.mother === mother.name
        && pers.sex === 'm');
    } else {
      childrens = [...people].filter(pers => pers.mother === mother.name);
    }

    const difference = childrens.reduce((summary, children) => {
      countOfChildrens++;

      return children.born - mother.born + summary;
    }, 0);

    return sum + difference;
  }, 0);

  const avg = sumOfDifferences / countOfChildrens;

  return avg;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
