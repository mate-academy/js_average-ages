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
const hasChildren = (person, people) => {
  return people.some(kid => kid.mother === person.name);
};

const hasSon = (person, people) => {
  return people.some(kid => {
    return kid.mother === person.name && kid.sex === 'm';
  });
};

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => {
      const centuryDied = Math.ceil(person.died / 100);

      return person.sex === 'm' && centuryDied === century;
    })
    : people.filter(person => person.sex === 'm');

  const totalAge = men.reduce((total, person) => {
    const age = person.died - person.born;

    return total + age;
  }, 0);

  const averageAge = totalAge / men.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  const women = withChildren
    ? people.filter(person => {
      return person.sex === 'f' && hasChildren(person, people);
    })
    : people.filter(person => person.sex === 'f');

  const womenTotalAge = women.reduce((total, person) => {
    const age = person.died - person.born;

    return total + age;
  }, 0);

  const womenAverageAge = womenTotalAge / women.length;

  return womenAverageAge;
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
  const women = onlyWithSon
    ? people.filter(person => person.sex === 'f' && hasSon(person, people))
    : people.filter(person => {
      return person.sex === 'f' && hasChildren(person, people);
    });

  const womenNames = women.map(woman => woman.name);

  const kids = onlyWithSon
    ? people.filter(person => {
      return womenNames.includes(person.mother) && person.sex === 'm';
    })
    : people.filter(person => womenNames.includes(person.mother));

  const totalAgeDifference = kids.reduce((total, kid) => {
    const mother = women.find(woman => woman.name === kid.mother);

    const output = mother ? total + (kid.born - mother.born) : total;

    return output;
  }, 0);

  return totalAgeDifference / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
