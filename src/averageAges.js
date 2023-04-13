'use strict';

function averageAge(menWomen) {
  return menWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / menWomen.length;
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
  const filteredPeople
   = century ? people.filter(p => Math.ceil(p.died / 100) === century) : people;
  const men = filteredPeople.filter(p => p.sex === 'm');
  const totalAge = men.reduce((sum, p) => sum + (p.died - p.born), 0);

  return totalAge / men.length;
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
  const women = people.filter(({ sex, name }) => (
    withChildren
      ? people.some(({ mother }) => mother === name) && sex === 'f'
      : sex === 'f'
  ));

  return averageAge(women);
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
