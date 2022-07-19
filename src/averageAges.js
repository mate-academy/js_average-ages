'use strict';

// callback for average age from first two tasks
const calcAvg = ages => {
  return ages.reduce((a, b) => (
    a + b), 0) / ages.length;
};

function roundAge(age) {
  return Number(age.toFixed(2));
};
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
  const men = people.filter(person => person.sex === 'm');

  const menBasedCentury = century
    ? men.filter(person => century === Math.ceil(person.died / 100))
    : men;
  const menAges = menBasedCentury.map(({ died, born }) => died - born);

  return roundAge(calcAvg(menAges));
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
  // // write code here
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    && women.filter(female => {
      return people.some(person => person.mother === female.name);
    });

  const checkedWomen = womenWithChildren || women;

  const womenAges = checkedWomen.map(({ died, born }) => died - born);

  return roundAge(calcAvg(womenAges));
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
  const children = people.filter(person => {
    const isChild = people.some(human => human.name === person.mother);

    return onlyWithSon ? (person.sex === 'm' && isChild) : isChild;
  });

  const diffAges = children.map(child => {
    const mother = people.find(human => human.name === child.mother);

    return child.born - mother.born;
  });

  return roundAge(calcAvg(diffAges));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
