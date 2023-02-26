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
  const mens = people.filter(({ sex, died }) => (
    sex === 'm' && (century ? century === Math.ceil(died / 100) : true)
  ));

  const menAges = getAge(mens);

  return menAges.reduce((acc, age) => acc + age, 0) / menAges.length;
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
  const womens = people.filter(({ name, sex }) => (
    sex === 'f' && (
      withChildren
        ? people.some(({ mother }) => mother === name)
        : true)
  ));

  const womenAges = getAge(womens);

  return womenAges.reduce((acc, age) => acc + age, 0) / womenAges.length;
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
  const children = people.filter((person) => {
    const mother = people.some((woman) => woman.name === person.mother);

    if (onlyWithSon) {
      return mother && person.sex === 'm';
    }

    return mother;
  });

  const differences = children.map((child) => {
    const mother = people.find((mom) => mom.name === child.mother);

    return child.born - mother.born;
  });

  return differences.reduce((acc, diff) => acc + diff, 0) / differences.length;
}

function getAge(sortPeople) {
  return sortPeople.map(({ died, born }) => died - born);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
