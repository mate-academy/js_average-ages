"use strict";

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
  const menArray = century
    ? [...people].filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : [...people].filter(person => person.sex === 'm');

  const averageAge = calculateAverageAge(menArray);

  return averageAge;
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
  const womenWithChildren = [];
  const womenArr = withChildren ? Array.from(new Set(people
    .filter(person => person.mother !== null)
    .map(person => person.mother)))
    : [...people].filter(person => person.sex === 'f');

  people.forEach(woman => {
    if (womenArr.includes(woman.name)) {
      womenWithChildren.push(woman);
    };
  });

  const averageAge = withChildren ? calculateAverageAge(womenWithChildren)
    : calculateAverageAge(womenArr);

  return averageAge;
}

function calculateAverageAge(array) {
  const allAge = array.reduce((acc, curr) => acc + (curr.died - curr.born), 0);
  const averageAge = +(allAge / array.length).toFixed(2);

  return averageAge;
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
  const mothersAndChild = [];
  let ageDiff = 0;

  people.forEach(person => {
    mothersAndChild
      .push([(onlyWithSon && person.sex === 'f')
      || people.find(el => el.name === person.mother), person.born]);

    typeof mothersAndChild[mothersAndChild.length - 1][0] === 'object'
      || mothersAndChild.pop();
  });

  ageDiff = mothersAndChild
    .reduce((acc, curr) => acc + curr[1] - curr[0].born, 0);

  return +(ageDiff / mothersAndChild.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
