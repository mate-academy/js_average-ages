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

function sexDefined(value) {
  return person => person.sex === value;
}

function diedInCentury(century) {
  return person => century ? Math.ceil(person.died / 100) === century : person;
}

function averageAge(ages) {
  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(sexDefined('m'));
  const menDiedInCentury = men.filter(diedInCentury(century));
  const menAges = menDiedInCentury.map(person => person.died - person.born);

  return averageAge(menAges);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  const women = people.filter(sexDefined('f'));

  const womenWithChildren = people
    .filter(person => people
      .find(child => child.mother === person.name));

  const womenOfAges = withChildren
    ? womenWithChildren.map(person => person.died - person.born)
    : women.map(person => person.died - person.born);

  return averageAge(womenOfAges);
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
  const children = people
    .filter(child => onlyWithSon ? (child && child.sex === 'm') : child)
    .filter(person => {
      const child = people
        .find(potentialChild => person.mother === potentialChild.name);

      return child;
    });

  const differenceOfAges = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });
  const averageAgeOfDiff = averageAge(differenceOfAges);

  return averageAgeOfDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
