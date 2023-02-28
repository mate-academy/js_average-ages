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
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const menInCentury = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century && person.sex === 'm')
    )
    : people.filter(person => person.sex === 'm');

  const ageArr = menInCentury.map(obj => obj.died - obj.born);

  return ageArr.reduce((acc, diff) => acc + diff, 0) / menInCentury.length;
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
    ? people.filter(person => {
      const child = people.some(someone => someone.mother === person.name);

      return child;
    })
    : people.filter(person => person.sex === 'f');

  const ageArr = women.map(obj => obj.died - obj.born);

  return ageArr.reduce((acc, diff) => acc + diff, 0) / women.length;
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

    return onlyWithSon ? mother && person.sex === 'm' : mother;
  });

  const difference = children.map((child) => {
    const mother = people.find((mom) => mom.name === child.mother);

    return child.born - mother.born;
  });

  return difference.reduce((acc, diff) => acc + diff, 0) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
