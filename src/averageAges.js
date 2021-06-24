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
 *
 */
function averageAge(objectWithPeoples, momWithSon, people) {
  const allAges = momWithSon ? objectWithPeoples.map(child => {
    const mom = people.find(mother => child.mother === mother.name);

    return child.born - mom.born;
  }) : objectWithPeoples.map(human => human.died - human.born);

  return allAges.reduce((sumOFAge, nextAge) =>
    sumOFAge + nextAge, 0) / allAges.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = century
    ? people.filter(man => century === Math.ceil(man.died / 100)
& man.sex === 'm') : people.filter(man => man.sex === 'm');

  return averageAge(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = withChildren
    ? people.filter(woman => woman.sex === 'f'
& people.find(child => child.mother === woman.name)
!== undefined) : people.filter(woman => woman.sex === 'f');

  return averageAge(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at cld bhiirth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const children = onlyWithSon
    ? people.filter(child => child.sex === 'm'
    & people.find(mother => child.mother === mother.name) !== undefined)
    : people.filter(child => people.find(mother => child.mother
    === mother.name));

  return averageAge(children, true, people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
