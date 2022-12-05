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
 *
 */
const findTheAverage = (people) => {
  return people.reduce((age, person) => (
    age + (person.died - person.born)
  ), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => {
    const Man = person.sex === 'm';

    return century
      ? Man && Math.ceil(person.died / 100) === century
      : Man;
  });

  return findTheAverage(onlyMen);
}
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
    const Woman = person.sex === 'f';

    return withChildren
      ? Woman && people.some(child => child.mother === person.name)
      : Woman;
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
  const children = people.filter(child => {
    const boy = people.some(mother => mother.name === child.mother);
    const isMale = child.sex === 'm';

    return (onlyWithSon)
      ? boy && isMale
      : boy;
  });

  const differenceAge = children.map(child => (
    child.born - people.find(mom => mom.name === child.mother).born
  ));
  const lastValue = averageAge(differenceAge);

  return lastValue;
}

const averageAge = (array) => (
  array.reduce((sum, person) => sum + person, 0) / array.length
);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
