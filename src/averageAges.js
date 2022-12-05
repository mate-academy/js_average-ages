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
const findTheAverage = (people) => {
  return people.reduce((age, person) => (
    age + (person.died - person.born)
  ), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => {
    const isMale = person.sex === 'm';

    return century
      ? isMale && Math.ceil(person.died / 100) === century
      : isMale;
  });

  return findTheAverage(onlyMen);
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
  const onlyWomen = people.filter(person => {
    const isFemale = person.sex === 'f';

    return withChildren
      ? isFemale && people.some(el => el.mother === person.name)
      : isFemale;
  });

  return findTheAverage(onlyWomen);
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
  const children = people.filter(person => (
    onlyWithSon
      ? people.some(mother => (
        person.mother === mother.name && person.sex === 'm'
      ))
      : people.some(mother => person.mother === mother.name))
  );

  const ageDifference = children.reduce((ageDiff, child) => {
    const mother = people.find(person => person.name === child.mother);

    return ageDiff + child.born - mother.born;
  }, 0);

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
