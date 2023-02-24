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
  const validPeople = people.filter(
    person => person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100))
  );

  return (averageAgeTotal(validPeople) / validPeople.length);
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
  const validPeople = people.filter(
    women => women.sex === 'f'
      && (!withChildren || people.map(
        person => person.mother).includes(women.name)
      ),
  );

  return (averageAgeTotal(validPeople) / validPeople.length);
}

function averageAgeTotal(validPeople) {
  return validPeople.reduce((total, person) => {
    const { born, died } = person;

    return total + died - born;
  }, 0);
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
  const validChildren = people.filter(
    child =>
      child.mother
      && (!onlyWithSon || child.sex === 'm')
      && people.some(person => person.name === child.mother)
  );

  const ageDifferenceTotal = validChildren.reduce(
    (total, child) => total + (child.born - people.find(
      person => person.name === child.mother
    ).born), 0
  );

  return ageDifferenceTotal / validChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
