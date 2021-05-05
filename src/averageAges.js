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
  const men = century ? people
    .filter(person => (person.sex === 'm')
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const mansAverageAge = men.map(person => person.died - person.born)
    .reduce((ageSum, manAge) => ageSum + manAge) / men.length;

  return mansAverageAge;
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
  const women = withChildren
    ? people
      .filter(woman => people
        .find(person => person.mother === woman.name))
    : people
      .filter(person => person.sex === 'f');
  const womenAverageAge = women.map(woman => woman.died - woman.born)
    .reduce((ageSum, womanAge) =>
      ageSum + womanAge) / women.length;

  return womenAverageAge;
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
  const children = onlyWithSon
    ? people
      .filter(child => people
        .find(person => person.name === child.mother))
      .filter(person => person.sex === 'm')
    : people.filter(child => {
      const mother = people
        .find(person => person.name === child.mother);

      return mother;
    });
  const avarageAge = children.map(child => {
    const mother = people
      .find(person => person.name === child.mother);

    return child.born - mother.born;
  });
  const mothersAverageAgeResult = avarageAge
    .reduce((ageSum, motherAge) => ageSum + motherAge) / children.length;

  return mothersAverageAgeResult;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
