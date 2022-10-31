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
  const men = (!century)
    ? getHumanByGender(people, 'm')
    : getHumanByGender(people, 'm')
      .filter(human => Math.ceil(human.died / 100) === century);

  return getAvgAge(men);
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
  const women = (!withChildren)
    ? getHumanByGender(people, 'f')
    : getHumanByGender(people, 'f')
      .filter(woman => (people.find(human => human.mother === woman.name)));

  return getAvgAge(women);
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
  const children = (!onlyWithSon)
    ? people.filter(child =>
      people.find(mother => child.mother === mother.name))
    : getHumanByGender(
      people.filter(child =>
        people.find(mother => child.mother === mother.name)),
      'm');

  const sumDiffAge = children.reduce((sum, child) => {
    const age = child.born
      - people.find(mother => child.mother === mother.name).born;

    return sum + age;
  }, 0);

  return sumDiffAge / children.length;
}

function getHumanByGender(people, gender) {
  return people.filter(human => human.sex === gender);
}

function getAvgAge(people) {
  const sumAge = people.reduce((sum, human) =>
    sum + (human.died - human.born), 0);

  return sumAge / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
