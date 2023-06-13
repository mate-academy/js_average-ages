'use strict';

/**
 * The function calculates average age from given people.
 * If people are undefined, finction throws error.
 * Returns 0 for no person in people.
 *
 * @param {object[]} people
 *
 * @return {number}
 */
function calculatePeopleAverageAge(people) {
  if (people === undefined) {
    throw new Error('People are undefined.');
  }

  const peopleCount = people.length;

  if (peopleCount === 0) {
    return 0;
  }

  const sumAges = people.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return sumAges / peopleCount;
}

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
  const men = people.filter(person => {
    const onlyMan = person.sex === 'm';

    return century
      ? onlyMan && Math.ceil(person.died / 100) === century
      : onlyMan;
  });

  return calculatePeopleAverageAge(men);
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
  const women = people.filter(mother => {
    const onlyWoman = mother.sex === 'f';

    return withChildren
      ? onlyWoman && people.find(child => child.mother === mother.name)
      : onlyWoman;
  });

  return calculatePeopleAverageAge(women);
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
  let sumAgesDifferences = 0;

  const children = people.filter(child => {
    const childMother = people.find(mother =>
      child.mother === mother.name && (onlyWithSon ? child.sex === 'm' : true)
    );

    const childExists = childMother !== undefined;

    if (childExists) {
      sumAgesDifferences += (child.born - childMother.born);
    }

    return childExists;
  });

  const childrenCount = children.length;

  if (childrenCount === 0) {
    return 0;
  }

  return sumAgesDifferences / childrenCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
