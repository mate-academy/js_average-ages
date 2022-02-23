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
  const filteredPeople = arguments.length < 2
    ? people
    : people.filter(person => Math.ceil(person.died / 100) === century);

  const filteredMen = filteredPeople.filter(matchSex('m'));

  const ages = filteredMen.map(personAge);

  return average(ages);
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
  const filteredWithChildren = arguments.length < 2
    ? people
    : people.filter(
      person => people.some(otherPerson => otherPerson.mother === person.name));

  const filteredWomen = filteredWithChildren.filter(matchSex('f'));

  const ages = filteredWomen.map(personAge);

  return average(ages);
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
  const peopleMap = people.reduce((map, person) => {
    map[person.name] = person;

    return map;
  }, {});

  const filteredPeople = arguments.length < 2
    ? people
    : people.filter(matchSex('m'));

  const ageDiffs
    = filteredPeople.filter(person => peopleMap[person.mother] !== undefined)
      .map(person => person.born - peopleMap[person.mother].born);

  return average(ageDiffs);
}

function personAge(person) {
  return person.died - person.born;
}

function average(array) {
  function sum(a, b) {
    return a + b;
  }

  return array.reduce(sum) / array.length;
}

const matchSex = sex => (person) => {
  return person.sex === sex;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
