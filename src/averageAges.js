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
function sumOfYears(age) {
  return age.reduce((prev, person) => (person.died - person.born) + prev,
    0,
  );
}

function calculateMenAverageAge(people, century) {
  // write code here
  const men = people.filter(person => century
    ? person.sex === 'm' && (century === Math.ceil(person.died / 100))
    : person.sex === 'm'
  );

  const totalAges = sumOfYears(men);

  return totalAges / men.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  // write code here
  const peopleWithMothers = people.filter(person => person.mother !== null);
  const mothersNames = peopleWithMothers.map(person => person.mother);
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && mothersNames.includes(person.name)
    : person.sex === 'f'
  );

  const totalAges = sumOfYears(women);

  return totalAges / women.length;
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
  // write code here

  const children = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother) && person.sex === 'm'
    : people.some(mother => mother.name === person.mother)
  );

  const ages = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother).born)
  );

  const sumOfAgesDifferences = ages.reduce((prev, years) => years + prev, 0);

  return sumOfAgesDifferences / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
