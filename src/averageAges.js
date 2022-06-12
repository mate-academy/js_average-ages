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
const filterSex = (person, sex) => {
  return person.sex === sex;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menDatabase = century !== undefined
    ? people.filter(person => filterSex(person, 'm')
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => filterSex(person, 'm'));

  const ages = menDatabase.map((man) => man.died - man.born);

  return averageAge(ages);
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
  const womenDatabase = (withChildren)
    ? people.filter(person => filterSex(person, 'f')
    && people.some(child => child.mother === person.name))
    : people.filter(person => filterSex(person, 'f'));

  const ages = womenDatabase.map((woman) => woman.died - woman.born);

  return averageAge(ages);
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

const someFunc = (person, people) => {
  return people.some(mother => mother.name
    === person.mother);
};

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenDatabase = (onlyWithSon)
    ? people.filter(person => filterSex(person, 'm')
    && someFunc(person, people))
    : people.filter(person => someFunc(person, people));

  const ageDiff = childrenDatabase.map((child) => {
    return (child.born - people.find(mother => mother.name
      === child.mother).born);
  });

  return averageAge(ageDiff);
}

const averageAge = averageAgeArray => {
  return (averageAgeArray.reduce((age1, age2) => age1 + age2, 0))
    / averageAgeArray.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
