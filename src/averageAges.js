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
  const man = century
    ? people.filter(({ died, sex }) => {
      return Math.ceil(died / 100) === century && sex === 'm';
    })
    : people.filter(({ sex }) => {
      return sex === 'm';
    });

  return man.reduce((acc, { born, died }) => {
    return acc + (died - born);
  }, 0) / man.length;
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
    ? people.filter((woman) => {
      return woman.sex === 'f'
      && people.some((child) => {
        return child.mother === woman.name;
      });
    })
    : people.filter(({ sex }) => {
      return sex === 'f';
    });

  return women.reduce((acc, { born, died }) => {
    return acc + (died - born);
  }, 0) / women.length;
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
  const mothers = people.filter((woman) => {
    return woman.sex === 'f'
    && people.some((child) => {
      return woman.name === child.mother;
    });
  });

  const children = onlyWithSon
    ? people.filter((child) => {
      return child.sex === 'm'
      && mothers.some(woman => {
        return child.mother === woman.name;
      });
    })
    : people.filter((child) => {
      return mothers.some(woman => {
        return child.mother === woman.name;
      });
    });

  return children.reduce((acc, child) => {
    return acc + child.born - mothers.find(woman => {
      return child.mother === woman.name;
    }).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
