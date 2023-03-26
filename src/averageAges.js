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
  let men = [...people].filter(({ sex, died }) => sex === 'm');
  let age = [];
  const centuryDied = (year, died) => Math.ceil(died / 100) === century;

  men = century && isNaN(century) !== true
    ? men.filter(({ died }) => centuryDied(century, died))
    : men.filter(person => person.sex === 'm');

  men.every(person => age.push((person.died - person.born)));
  age = age.reduce((person1, person2) => person1 + person2);

  return age / men.length;
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

  const women = !withChildren
    ? [...people].filter(person => person.sex === 'f')
    : mothersWithChilder();
  let age = [];

  function mothersWithChilder() {
    let result = people.map(person => {
      const childrens = people.filter(a => a.mother === person.name);

      return Object.assign({ ...person }, { children: childrens });
    });

    result = result.filter(a => a.children.length);

    return result;
  }

  women.every(person => age.push((person.died - person.born)));
  age = age.reduce((person1, person2) => person1 + person2);

  return age / women.length;
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
  const kids = (onlyWithSon
    ? [...people].filter(person => person.sex === 'm')
    : [...people]
  );
  let age = [];

  kids.map(children => {
    const mother = people.find(person => person.name === children.mother);
    const result = mother ? children.born - mother.born : undefined;

    age.push(result);
  });
  age = age.filter((a) => a !== undefined);
  age = age.reduce((a, b) => a + b) / age.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
