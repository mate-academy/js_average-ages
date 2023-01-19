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

  let men = people.filter(person => person.sex === 'm');

  men
    = century
      ? men.filter(person => Math.ceil(person.died / 100) === century)
      : men;

  const ages = yearsAlive(men);

  return Math.round(ages.reduce((a, b) => a + b) / ages.length * 100) / 100;
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
  let women = people.filter(person => person.sex === 'f');

  women
    = withChildren
      ? women.filter(woman => people.some(p => p.mother === woman.name))
      : women;

  const ages = yearsAlive(women);

  return Math.round(ages.reduce((a, b) => a + b) / ages.length * 100) / 100;
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
  // const women = people.filter(person =>
  //   person.sex === 'f'
  //   && people.some(p => p.mother === person.name
  //   && (onlyWithSon ? p.sex === 'm' : true)));

  // const ages = women.map(w => people.filter(child => child.mother === w.name
  //   && (onlyWithSon ? child.sex === 'm' : true)).map(ch =>
  //   ch.born - w.born)).flatMap(t => t);

  const children = people.filter(child =>
    people.find(mother => child.mother === mother.name)
    && (!onlyWithSon || child.sex === 'm'));

  const ageDifference = children.reduce((acc, nextItem) => {
    const motherA = people.find(p => nextItem.mother === p.name);

    return acc + (nextItem.born - motherA.born);
  }, 0);

  return Math.round(ageDifference / children.length * 100) / 100;
}

const yearsAlive = (person) => person.map(p => p.died - p.born);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
