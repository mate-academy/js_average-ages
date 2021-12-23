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
function calculateMenAverageAge(people, century = null) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let age = 0;
  let persons = [];

  if (century !== null) {
    persons = people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century
    );
  } else {
    persons = people.filter(man => man.sex === 'm');
  }

  age = persons.reduce((prev, current) => prev + (current.died - current.born),
    0
  );

  age /= persons.length;

  return age;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let age = 0;
  let persons = [];

  if (!withChildren) {
    persons = people.filter(woman => woman.sex === 'f');
  } else {
    persons = people.filter(woman => woman.sex === 'f'
      && people.some(person => person.mother === woman.name)
    );
  }

  age = persons.reduce((prev, current) => prev + (current.died - current.born),
    0
  );

  age /= persons.length;

  return age;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let age = 0;
  let persons = [];

  if (!onlyWithSon) {
    persons = people.filter(person => (
      people.some(mother => person.mother === mother.name)
    ));
  } else {
    persons = people.filter(person => (
      person.sex === 'm'
      && people.some(mother => (person.mother === mother.name))
    ));
  }

  age = persons.reduce((prev, current) => prev
    + (current.born
      - people.find(person => current.mother === person.name).born),
  0
  );

  age /= persons.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
