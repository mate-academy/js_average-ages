'use strict';

const getAverage = (data) => (
  data.reduce((acc, el) => (
    acc + el
  ), 0) / data.length || 0
);

const getAges = (people) => (
  people.map(({ born, died }) => died - born)
);

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
  const men = people.filter(({ sex, died }) => (
    sex === 'm' && (
      century
        ? Math.ceil(died / 100) === century
        : true
    )
  ));

  const ages = getAges(men);

  return getAverage(ages);
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
  const women = people.filter((person) => (
    person.sex === 'f' && (
      withChildren
        ? people.find(({ mother }) => mother === person.name)
        : true
    )
  ));

  const ages = getAges(women);

  return getAverage(ages);
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
  const children = people.filter(({ mother: motherName, sex }) => (
    people.find(({ name }) => name === motherName) && (
      onlyWithSon
        ? sex === 'm'
        : true
    )
  ));
  const agesDifferences = children.map(({ mother, born }) => {
    const { born: motherBorn } = people.find(({ name }) => (
      name === mother
    ));

    return born - motherBorn;
  });

  return getAverage(agesDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
