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
function findAverageAge(filteredList) {
  const averageAge = filteredList.reduce((acc, cur) => (
    acc + (cur.died - cur.born)
  ), 0);

  return averageAge / filteredList.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMan = people.filter(human => !century
    ? human.sex === 'm'
    : Math.ceil(human.died / 100) === century && human.sex === 'm'
  );

  return findAverageAge(filteredMan);
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
  const women = people.filter(human => !withChildren
    ? human.sex === 'f'
    : human.sex === 'f' && people.find(kid => (
      kid.mother === human.name
    )));

  return findAverageAge(women);
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
  const kids = people.filter(kid => !onlyWithSon
    ? kid.mother && people.find(human => human.name === kid.mother)
    : kid.mother && people.find(human => human.name === kid.mother)
      && kid.sex === 'm');

  const ageSum = kids.reduce((acc, cur) => {
    const mother = people.find(
      human => human.name === cur.mother);

    return acc + cur.born - mother.born;
  }, 0);

  return ageSum / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
