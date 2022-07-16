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
  let man = people.filter(human => (human.sex === 'm'));

  const result = century
    ? man = man.filter(human => Math.ceil(human.died / 100) === century)
    : man;

  return man.reduce((sum, human) =>
    sum + (human.died - human.born), 0) / result.length;
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
  let mother;

  const mothersNames = people
    .filter((name) => name.mother !== null)
    .map((name) => name.mother);

  mother = withChildren
    ? mother = people.filter(obj => mothersNames.indexOf(obj.name) !== -1)
    : mother = people.filter(obj => obj.sex === 'f');

  return mother.reduce((sum, human) =>
    sum + (human.died - human.born), 0) / mother.length;
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
  let childrens;

  childrens = onlyWithSon
    ? childrens = people.filter(human => human.mother !== null
    && human.sex === 'm')
    : childrens = people.filter(human => human.mother !== null);

  const difference = childrens
    .map(child => {
      switch (people.findIndex(parent => parent.name === child.mother) >= 0) {
        case true:
          const positionOfMother
          = people.findIndex(x => x.name === child.mother);

          return child.born - people[positionOfMother].born;

        default:
          return 0;
      }
    })
    .filter(item => item > 0);

  return difference.reduce((prev, x) => prev + x) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
