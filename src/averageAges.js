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
  const men = people.filter(person => person.sex === 'm');
  const peopleOfCentury = people.filter(person =>
    (Math.ceil(person.died / 100))
    === century && person.sex === 'm');

  if (century) {
    return (peopleOfCentury.map(person =>
      person.died - person.born)
      .reduce((a, b) => a + b, 0)
      / peopleOfCentury.length);
  } else {
    return men.map(person => person.died - person.born)
      .reduce((a, b) => a + b, 0)
        / men.length;
  }
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
  const women = people.filter(person => person.sex === 'f');
  const mothers = people.map(person => person.mother);
  const mothersInList = women.filter(mother => mothers.includes(mother.name));

  if (withChildren) {
    return mothersInList.map(person => person.died - person.born)
      .reduce((a, b) => a + b, 0)
        / mothersInList.length;
  } else {
    return women.map(person => person.died - person.born)
      .reduce((a, b) => a + b, 0)
        / women.length;
  }
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
  const women = people.filter(person => person.sex === 'f');
  const mothers = people.map(person => person.mother);
  const mothersInList = women.filter(mum => mothers.includes(mum.name));
  const sons = people.filter(son => son.sex === 'm');

  let toSearch = people;

  if (onlyWithSon) {
    toSearch = sons;
  }

  const motherAge = [];

  for (let i = 0; i < toSearch.length; i++) {
    for (let j = 0; j < mothersInList.length; j++) {
      if (toSearch[i].mother === mothersInList[j].name) {
        motherAge.push(toSearch[i].born - mothersInList[j].born);
      }
    }
  }

  const motherAverageAge = motherAge.reduce((a, b) =>
    a + b, 0) / motherAge.length;

  return Math.round(((motherAverageAge) + Number.EPSILON) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
