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
  const filteredMen = people.filter(person => {
    const { sex, died } = person;

    return century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';
  });

  // * I'm checking if array have some data about people
  // * (if we input in parameter `century` value which wasn't found)
  // * I know, I should avoid if (), but that condition do my code more flexible
  if (filteredMen.length === 0) {
    return null;
  }

  const totalAgeOfMen = getTotalAge(filteredMen);

  return totalAgeOfMen / filteredMen.length;
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
  const filteredWomen = people.filter(person => {
    const { sex, name } = person;

    if (withChildren === undefined) {
      return sex === 'f';
    }

    // * I add it, if will need to get info about women who don't have children,
    // * if input `false` in `withChildren` parameter.
    // * we have more flexible code, who have children or don't, and all women
    return withChildren
      ? sex === 'f' && people.some(personChild => personChild.mother === name)
      : sex === 'f' && people.every(personChild => personChild.mother !== name);
  });

  const totalAgeOfWomen = getTotalAge(filteredWomen);

  return totalAgeOfWomen / filteredWomen.length;
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
  const childrenList = people.filter(child => {
    return onlyWithSon
      ? people.some(mother => mother.name === child.mother && child.sex === 'm')
      : people.some(mother => mother.name === child.mother);
  });

  const ageDiffSum = childrenList.reduce((acc, child) => {
    const foundMother = people.find(mother =>
      mother.name === child.mother
    );

    if (foundMother) {
      const ageDiff = child.born - foundMother.born;

      return acc + ageDiff;
    }

    return acc;
  }, 0);

  return ageDiffSum / childrenList.length;
}

function getTotalAge(arrayOfPeople) {
  return arrayOfPeople.reduce((sumOfAge, person) => {
    const { born, died } = person;

    return sumOfAge + (died - born);
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
