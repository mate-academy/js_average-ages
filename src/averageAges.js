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
  const menInfo = people.filter(person => {
    return !century
      ? person.sex === 'm'
      : person.sex === 'm' && century === Math.ceil(person['died'] / 100);
  });
  const menFullAge = menInfo.map(year => year.died - year.born);
  const menAverageAge = menFullAge.reduce((manA, manB) => manA + manB);

  return menAverageAge / menInfo.length;
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
  const femaleInfo = people.filter(person => {
    return !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(child => {
        return person.name === child.mother;
      });
  });
  const womenFullAge = femaleInfo.map(year => year.died - year.born);
  const totalAge = womenFullAge.reduce((ageA, ageB) => ageA + ageB);

  return totalAge / femaleInfo.length;
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
  const childInfo = people.filter(person => {
    return !onlyWithSon
      ? people.some(female => female.name === person.mother)
      : person.sex === 'm' && people.some(female => {
        return female.name === person.mother;
      });
  });

  const difAges = childInfo.map(child => {
    const mother = people.find(women => child.mother === women.name);

    return child.born - mother.born;
  });
  const averageAge = difAges.reduce((ageA, ageB) => ageA + ageB);

  return averageAge / childInfo.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
