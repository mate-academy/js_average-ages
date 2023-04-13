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

  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ages = men.map(person => person.died - person.born);

  return ages.reduce((total, age) => total + age, 0) / ages.length;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(personInner => person.name === personInner.mother))
    : people.filter(person => person.sex === 'f');

  const ages = women.map(person => person.died - person.born);

  return ages.reduce((total, age) => total + age, 0) / ages.length;
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
 *
 *
 *
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => person.sex === 'f');

  const ages = women.map(woman => {
    const womansChildren = onlyWithSon
      ? people.filter(person => person.mother === woman.name
        && person.sex === 'm')
      : people.filter(person => person.mother === woman.name);

    const childrenBornYears = womansChildren.map(children => children.born);

    return {
      womanYear: woman.born,
      childrenBornYears,
    };
  });

  const flatAges = [];

  // I have the array of objects like this:
  // { womanYear: 1632, childrenBornYears: [1668,1652,1671] }
  // I need to map it to array of differences
  // of each children's years and their mother
  // so it will be longer than original
  // and for the line above I need:
  // [1668-1632, 1652-1632, 1671-1632]
  // I don't really see a way how to do it without nested loop
  // without touching the code above
  // so after trying a few different approaches none worked
  // so I left it as it was for now

  ages.forEach(age => age.childrenBornYears.forEach(childrenBornYear => (
    flatAges.push(childrenBornYear - age.womanYear))));

  return flatAges.reduce((total, age) => total + age, 0) / flatAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
