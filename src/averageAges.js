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

  const men = people.filter(person => person.sex === 'm'
  && (!century || Math.ceil(person.died / 100) === century));

  return calcAverageOfArrElements(men, true);
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
  const women = people.filter(person => {
    const someoneMothers = people.map(child => child.mother);

    return person.sex === 'f' && (!withChildren
      || someoneMothers.includes(person.name));
  });

  return calcAverageOfArrElements(women, true);
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
  people.forEach(function(person) {
    const parentName = person.name;

    person.child = people.filter(child => child.mother === parentName);
  });

  const ageDifference = [];

  const children = people.filter(child => people.some(person =>
    child.mother === person.name
    && (!onlyWithSon || child.sex === 'm')
  )
  );

  children.forEach(function(child) {
    const parentBornYear = people.find(person =>
      person.name === child.mother).born;

    ageDifference.push(child.born - parentBornYear);
  });

  return calcAverageOfArrElements(ageDifference);
}

function calcAverageOfArrElements(arr, age = false) {
  const arrSum = arr.reduce((sum, current) => {
    return sum + ((age)
      ? (current.died - current.born)
      : current);
  }, 0);

  return arrSum / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
