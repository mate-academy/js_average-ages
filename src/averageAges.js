'use strict';

/**
 * Helper Functions
 */
const filterByGender = (people, gender) => {
  return people.filter((person) => person.sex === gender);
};

const calculateAverage = (array) => {
  return (
    array.reduce((ageSum, { died, born }) => died - born + ageSum, 0)
    / array.length
  );
};

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
  const men = century
    ? filterByGender(people, 'm').filter(
      (person) => Math.ceil(person.died / 100) === century
    )
    : filterByGender(people, 'm');

  return calculateAverage(men);
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
  const women = withChildren
    ? filterByGender(people, 'f').filter((mother) =>
      people.some((child) => child.mother === mother.name)
    )
    : filterByGender(people, 'f');

  return calculateAverage(women);
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
  const children = onlyWithSon
    ? people.filter(
      (person) =>
        people.some((mother) => person.mother === mother.name)
          && person.sex === 'm'
    )
    : people.filter((person) =>
      people.some((mother) => person.mother === mother.name)
    );

  const diff = children.map(
    (child) =>
      child.born - people.find((mother) => child.mother === mother.name).born
  );

  return diff.reduce((acc, el) => acc + el) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
