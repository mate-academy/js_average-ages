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

  men = century === undefined
    ? men
    : men.filter(man => Math.ceil(man.died / 100) === century);

  const agesSum = men.reduce(
    (sum, man) => sum + man.died - man.born, 0
  );

  return agesSum / men.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = withChildren
    ? people.filter(
      posibleMom => people.some(person => person.mother === posibleMom.name)
    )
    : people.filter(person => person.sex === 'f');

  const agesSum = women.reduce(
    (sum, woman) => sum + woman.died - woman.born, 0
  );

  return agesSum / women.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const sample = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const children = sample.filter(
    person => people.some(mother => mother.name === person.mother)
  );

  const pairs = children.map(
    child => [child, people.find(person => person.name === child.mother)]
  );

  const ageDiffSum = pairs.reduce(
    (sum, pair) => sum + pair[0].born - pair[1].born, 0
  );

  return ageDiffSum / pairs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
