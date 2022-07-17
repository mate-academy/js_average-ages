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
  const relevantMen = (
    people.filter(person => (century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
    ))
  );

  const averageAgeForRelevantMen = (
    relevantMen.reduce((age, year) =>
      age + year.died - year.born, 0) / relevantMen.length
  );

  return averageAgeForRelevantMen;
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
  const relevantWomen = (
    people.filter(person => (withChildren
      ? people.some(isMother => person.name === isMother.mother)
      && person.sex === 'f'
      : person.sex === 'f'
    ))
  );

  const averageAgeForRelevantWomen = (
    relevantWomen.reduce((age, year) =>
      age + year.died - year.born, 0) / relevantWomen.length
  );

  return averageAgeForRelevantWomen;
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
  const relevantChildren = (
    people.filter(person => onlyWithSon
      ? people.some(child => person.mother === child.name) && person.sex === 'm'
      : people.some(child => person.mother === child.name)
    )
  );

  const averageAgeBetweenChildAndMother = (
    relevantChildren.reduce((ages, year) =>
      ages + year.born - people.find(person =>
        person.name === year.mother).born, 0) / relevantChildren.length
  );

  return averageAgeBetweenChildAndMother;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
