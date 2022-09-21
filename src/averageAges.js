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
  const peopleFilter = people.filter(element =>
    (century)
      ? element.sex === 'm'
      && Math.ceil(element.died / 100) === century
      : element.sex === 'm'
  );

  return peopleFilter.reduce((totalAge, person) => {
    return totalAge + (person.died - person.born);
  }, 0) / peopleFilter.length;
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
  const womenFilter = people.filter(element =>
    (withChildren)
      ? element.sex === 'f'
      && people.some(child => child.mother === element.name)
      : element.sex === 'f'

  );

  return womenFilter.reduce((totalAge, person) => {
    return totalAge + (person.died - person.born);
  }, 0) / womenFilter.length;
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
  const parentFilter = people.filter(function(element) {
    return people.some(mother => {
      if (onlyWithSon) {
        return element.mother === mother.name && element.sex === 'm';
      } else {
        return element.mother === mother.name;
      }
    });
  });

  const age = parentFilter.map(function(person) {
    const mom = people.find(el => person.mother === el.name);

    return (person.born - mom.born);
  });

  return age.reduce((totalAge, person) => {
    return totalAge + person;
  }) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
