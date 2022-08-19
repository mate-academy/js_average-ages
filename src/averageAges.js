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
  const arrWithMen = people.filter(person => person.sex === 'm');
  const isSpecifiedCentury = century ? people
    .filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : arrWithMen;

  const averageMansAge = isSpecifiedCentury
    .reduce((sum, man) =>
      sum + (man.died - man.born), 0) / isSpecifiedCentury.length;

  return averageMansAge;
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
  const female = people.filter(person => person.sex === 'f');
  const femaleWithKids = people.filter(mother => {
    const isFemale = people.some(person => person.mother === mother.name);

    return isFemale;
  });
  const isFemaleWithKid = withChildren ? femaleWithKids : female;

  const averageAge = isFemaleWithKid
    .reduce((sum, person) => sum + (person.died - person.born)
      , 0) / isFemaleWithKid.length;

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
  const womenListName = people.map(mother => mother.name);
  const womenWithKids = people
    .filter(child => womenListName.includes(child.mother));

  const isOnlyWithSon = onlyWithSon ? people
    .filter(child => people.find(mother =>
      mother.name === child.mother) && child.sex === 'm')
    : womenWithKids;

  const ageDiff = isOnlyWithSon.map(child => {
    const womenWithChild = people.find(mother =>
      mother.name === child.mother);

    return child.born - womenWithChild.born;
  });

  const averageAgeDiff = ageDiff
    .reduce((sum, item) => sum + item, 0) / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
