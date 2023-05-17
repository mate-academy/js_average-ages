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

  const manCheck = person => person.sex === 'm';
  const centuryCheck = person => {
    return manCheck(person) && Math.ceil(person.died / 100) === century;
  };

  const men = century !== undefined
    ? people.filter(centuryCheck)
    : people.filter(manCheck);

  return getAverageAge(men);
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
  const womanCheck = person => person.sex === 'f';
  const motherCheck = motherName => {
    const mother = people.find(person => person.mother === motherName);

    return mother;
  };

  const women = withChildren
    ? people.filter(person => motherCheck(person.name))
    : people.filter(womanCheck);

  return getAverageAge(women);
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
  const checkMother = motherName => people.find(
    person => person.name === motherName
  );
  const manChecking = person => person.sex === 'm';

  const children = onlyWithSon === true
    ? people.filter(person => checkMother(person.mother) && manChecking(person))
    : people.filter(person => checkMother(person.mother));

  const ageDiff = children.map(
    child => child.born - findMother(child.mother).born
  );

  function findMother(motherName) {
    return people.find(person => person.name === motherName);
  }

  const sumAges = ageDiff.reduce((sum, age) => sum + age);
  const avrAge = sumAges / ageDiff.length;

  return avrAge;
}

function getAverageAge(selectedPeople) {
  const ages = selectedPeople.map(person => person.died - person.born);
  const sumAges = ages.reduce((sum, age) => sum + age);
  const averageAge = sumAges / ages.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
