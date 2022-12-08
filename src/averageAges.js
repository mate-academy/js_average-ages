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
  const man = WhatIsSex(people, 'm');

  const filterCenturyMan = man.filter((person) => {
    if (century > 0) {
      return Math.ceil(person.died / 100) === century;
    } else {
      return man;
    }
  });

  return WhatIsAverAge(filterCenturyMan);
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
  const women = WhatIsSex(people, 'f');

  const womanWithChildren = withChildren
    ? women.filter((woman) => people.find((person) => woman.name
    === person.mother)
    )
    : women;

  return WhatIsAverAge(womanWithChildren);
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
  const children = people.filter(child => {
    return people.find(person => person.name === child.mother);
  });

  const HasSon = onlyWithSon
    ? WhatIsSex(children, 'm')
    : children;

  const sumDiff = HasSon.reduce((sum, son) => {
    return sum
      + son.born
      - people.find(person => person.name === son.mother).born;
  }, 0);

  return sumDiff / HasSon.length;
}

function WhatIsAverAge(people) {
  const sumAge = people
    .map((person) => person.died - person.born)
    .reduce((sum, age) => sum + age);

  return sumAge / people.length;
}

function WhatIsSex(people, sex) {
  const peopleBySex = people.filter(person => person.sex === sex);

  return peopleBySex;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
