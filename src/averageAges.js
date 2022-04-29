'use strict';

const isMale = person => person.sex === 'm';

const calculateAge = person => person.died - person.born;

const calculateAverage = ages =>
  ages.reduce((age1, age2) => age1 + age2) / ages.length;

const isMother = (people, woman) =>
  people.some(child => child.mother === woman.name);

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
  const calculateCentury = num => Math.ceil(num / 100);

  const men = people.filter(person =>
    century
      ? calculateCentury(person.died) === century && isMale(person)
      : isMale(person),
  );

  const menAges = men.map(calculateAge);

  return calculateAverage(menAges);
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
  const isFemale = person => person.sex === 'f';

  const women = people.filter(person =>
    withChildren
      ? isMother(people, person)
      : isFemale(person),
  );

  const womenAges = women.map(calculateAge);

  return calculateAverage(womenAges);
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
  const hasMother = person => people
    .some((mother) => person.mother === mother.name);

  const mothers = people.filter(person => isMother(people, person));

  const children = people.filter(person =>
    onlyWithSon
      ? isMale(person) && hasMother(person)
      : hasMother(person),
  );

  const ages = children.map(child => {
    const childAge = child.born;
    const childMother = mothers.find((mother) =>
      mother.name === child.mother);
    const motherAge = childMother.born;

    return childAge - motherAge;
  });

  return calculateAverage(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
