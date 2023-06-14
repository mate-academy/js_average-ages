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
  const men = people.filter(({ sex, died }) =>
    century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm'
  );

  const resultMenAverageAge = calculateAverageAge(men);

  return resultMenAverageAge;
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
  const women = people.filter(({ sex, name }) =>
    withChildren
      ? sex === 'f' && people.some(({ mother }) =>
        name === mother
      )
      : sex === 'f'
  );

  const resultWomenAverageAge = calculateAverageAge(women);

  return resultWomenAverageAge;
}

function calculateAverageAge(sex) {
  return (
    sex.reduce((totalAge, { born, died }) =>
      totalAge + died - born, 0
    ) / sex.length
  );
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
  const mothers = people.filter(({ name }) =>
    onlyWithSon
      ? people.some(({ mother, sex }) =>
        mother === name && sex === 'm'
      )
      : people.some(({ mother }) =>
        mother === name
      )
  );

  const children = people.filter(({ sex, mother }) =>
    onlyWithSon
      ? people.some(({ name }) =>
        name === mother && sex === 'm'
      )
      : people.some(({ name }) =>
        name === mother
      )
  );

  const resultAverageAgeDiff = children.reduce((totalDiff, { mother, born }) =>
    totalDiff + born - mothers.find(({ name }) =>
      name === mother
    ).born, 0
  ) / children.length;

  return resultAverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
