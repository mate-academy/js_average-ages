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
  const fullData = people.map(person => {
    const result = {
      ...person,
      century: Math.ceil(person.died / 100),
      age: person.died - person.born,
    };

    return result;
  });

  const men = fullData.filter((person) => century
    ? person.century === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const averageAge = men.reduce((acc, val) => acc + val.age, 0) / men.length;

  return +averageAge.toFixed(2);
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
  // write code here
  const peopleAddAge = people.map(person => {
    const result = {
      ...person,
      age: person.died - person.born,
    };

    return result;
  });

  const womenData = peopleAddAge.filter(person => withChildren
    ? peopleAddAge.find(child => child.mother === person.name)
      && person.sex === 'f'
    : person.sex === 'f'
  );

  const averageAgeDiff = womenData.reduce((acc, val) =>
    acc + val.age, 0) / womenData.length;

  return +averageAgeDiff.toFixed(2);
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
  // write code here
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name)
  );

  const ageDiff = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born
  );

  return +(ageDiff.reduce((acc, val) => acc + val)
    / ageDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
