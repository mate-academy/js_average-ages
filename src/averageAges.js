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

  const callback = (sum, cur) => {
    return sum + (cur.died - cur.born);
  };

  const mensDied = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const mensAverAge = mensDied.reduce(callback, 0) / mensDied.length;

  return mensAverAge;
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
  const callback = (sum, cur) => {
    return sum + (cur.died - cur.born);
  };

  const womenArr = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name && person.sex === 'f')
      : person.sex === 'f'
  );

  const womenAverageAge = womenArr.reduce(callback, 0) / womenArr.length;

  return womenAverageAge;
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
  const callback = (sum, cur) => {
    return sum + cur;
  };

  const motherArr = (onlyWithSon
    ? people.filter(child => child.sex === 'm'
      && people.find(item => item.name === child.mother))
    : people.filter(child => people.find(item => item.name === child.mother))
  );

  const ageDiff = motherArr.map(person =>
    person.born - people.find(item => item.name === person.mother).born);

  const averageAge = ageDiff.reduce(callback, 0) / ageDiff.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
