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
  const men = people.filter(person => {
    const isMan = person.sex === 'm';
    const isCentury = Math.ceil(person.died / 100) === century;

    return century
      ? isMan && isCentury
      : isMan;
  });

  const menAges = personAges(men);

  return averageAge(menAges);
}

const personAges = (people) => {
  return people.map(person => person.died - person.born);
};

const averageAge = (people) => {
  return people.reduce((a, b) => a + b, 0) / people.length;
};

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
  const women = people.filter(person => {
    const isWoman = person.sex === 'f';
    const hasChildren
    = people.some(children => children.mother === person.name);

    return withChildren
      ? isWoman && hasChildren
      : isWoman;
  });

  const womenAges = personAges(women);

  return averageAge(womenAges);
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
  const children = people.filter(person => {
    const hasMother = people.some(mother => mother.name === person.mother);
    const isMan = hasMother && person.sex === 'm';

    return onlyWithSon
      ? hasMother && isMan
      : hasMother;
  });

  const diff = children.map(person => {
    const childrensMother
    = people.find(mother => person.mother === mother.name);

    return person.born - childrensMother.born;
  });

  return averageAge(diff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
