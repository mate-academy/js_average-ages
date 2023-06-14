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
  const filteredMen = people.filter(person => {
    const isMale = person.sex === 'm';
    const isThisCentury = Math.ceil(person.died / 100) === century;

    return isMale && (century ? isThisCentury : true);
  });

  return calculateAverageAge(filteredMen);
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
  const hasChildren = (motherName) => people.some(
    person => person.mother === motherName);

  const filteredWomen = people.filter(person => {
    const isHasChildren = hasChildren(person.name);
    const isFemale = person.sex === 'f';

    return isFemale && (withChildren ? isHasChildren : true);
  });

  return calculateAverageAge(filteredWomen);
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
  const hasMother = (motherName) => {
    return people.some(person => person.name === motherName);
  };
  const children = people.filter(person => {
    const isHasMother = person.mother !== null && hasMother(person.mother);
    const isMale = person.sex === 'm';

    return isHasMother && (onlyWithSon ? isMale : true);
  });

  const mothers = children.map(child => {
    return people.find(person => person.name === child.mother);
  });

  return getAverageAgeDiff(children, mothers);
}

function calculateAverageAge(people) {
  const averageAge = people.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / people.length;

  return +averageAge.toFixed(2);
}

function getAverageAgeDiff(children, mothers) {
  const ageDiff = children.map(child => {
    const childMother = mothers.find(mother => mother.name === child.mother);

    return child.born - childMother.born;
  });

  const averageAgeDiff = ageDiff
    .reduce((sum, age) => sum + age, 0) / ageDiff.length;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
