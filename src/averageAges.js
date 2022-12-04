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
    ? people.filter(person => isMale(person) && bornInCentury(person, century))
    : people.filter(person => isMale(person));

  const ages = men.map(man => calculateAge(man));

  return calculateAverageAge(ages);
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
  const women = people.filter(person => !isMale(person));

  const namesOfMothers = people.map(person => person.mother);

  const ages = withChildren
    ? findMother(women, namesOfMothers).map(woman => calculateAge(woman))
    : women.map(woman => calculateAge(woman));

  return calculateAverageAge(ages);
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
  const haveMother = people.filter(person => person.mother !== null);

  const peopleMothers = haveMother.map(hasMother => hasMother.mother);
  const mothers = findMother(people, peopleMothers);

  const mothersNames = mothers.map(mother => mother.name);

  const children = onlyWithSon
    ? haveMother.filter(hasMother =>
      mothersNames.some(motherName =>
        hasMother.mother === motherName) && isMale(hasMother))

    : haveMother.filter(hasMother =>
      mothersNames.some(motherName =>
        hasMother.mother === motherName)
    );

  const difference = children.map(child => {
    const motherOfChildName = child.mother;
    const motherOfChild = mothers.find((mother) =>
      motherOfChildName === mother.name);

    return child.born - motherOfChild.born;
  });

  return calculateAverageAge(difference);
}

function isMale(person) {
  return person.sex === 'm';
}

function bornInCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateAverageAge(ages) {
  return ages.reduce((total, current) => total + current) / ages.length;
}

function findMother(people, mothersNames) {
  return people.filter(person => (
    mothersNames.some(name => person.name === name)
  ));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
