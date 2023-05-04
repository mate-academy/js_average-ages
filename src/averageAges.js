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
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
function calculateAverageAge(people) {
  const ages = people.map(person => person.died - person.born);
  const sumAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = sumAges / ages.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
  );

  return calculateAverageAge(men);
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
  const women = people.filter(person =>
    person.sex === 'f'
      && (!withChildren || people.some(child => child.mother === person.name))
  );

  return calculateAverageAge(women);
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = women.filter(woman =>
    people.some(person => person.mother === woman.name)
  );

  const children = people.filter(person =>
    mothers.some(mother => person.mother === mother.name)
    && (!onlyWithSon || person.sex === 'm')
  );

  const ageDiffs = children.map(child => {
    const foundMother = mothers.find(mother => mother.name === child.mother);

    return child.born - foundMother.born;
  });

  const totalAgeDiff = ageDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);

  return totalAgeDiff / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
