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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const man = people.filter(human =>
    century
      ? human.sex === 'm' && Math.ceil(human.died / 100) === century
      : human.sex === 'm'
  );

  return man
    .map(human => human.died - human.born)
    .reduce((accamulator, current) => accamulator + current, 0) / man.length;
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

  const woman = people.filter(human =>
    withChildren
      ? people.some(child => child.mother === human.name && human.sex === 'f')
      : human.sex === 'f'
  );

  return woman
    .map(liveAge => liveAge.died - liveAge.born)
    .reduce((accamulator, current) => accamulator + current, 0) / woman.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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

  const children = people.filter(human =>
    onlyWithSon
      ? (people.some(person => human.mother === person.name))
      && human.sex === 'm'
      : people.some(person => human.mother === person.name)
  );

  return children
    .map(human => human.born - people
      .find(person => person.name === human.mother)
      .born)
    .reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
