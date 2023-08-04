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
function getAvarageAge(people) {
  const avarageAge = people
    .reduce((sumAge, currentValue) => sumAge + currentValue, 0)
    / people.length;

  return avarageAge;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(person => person.sex === 'm');
  const ages = [];

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  for (const man of men) {
    ages.push(man.died - man.born);
  }

  return getAvarageAge(ages);
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
  let women = people.filter(person => person.sex === 'f');
  const ages = [];
  const mothers = [];

  for (const person of people) {
    mothers.push(person.mother);
  }

  if (withChildren) {
    women = women.filter(person => mothers.includes(person.name));
  }

  for (const woman of women) {
    ages.push(woman.died - woman.born);
  }

  return getAvarageAge(ages);
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
  const mothersNames = [];
  let children = [];
  const mothers = [];
  const difference = [];

  for (const person of people) {
    mothersNames.push(person.mother);
  }

  for (const person of people) {
    if (person.mother && mothersNames.includes(person.mother)) {
      children.push(person);
    }

    if (onlyWithSon) {
      children = children.filter(son => son.sex === 'm');
    }

    if (mothersNames.includes(person.name)) {
      mothers.push(person);
    }
  }

  for (const child of children) {
    const currMother = mothers.find(mother => mother.name === child.mother);

    if (currMother) {
      difference.push(child.born - currMother.born);
    }
  }

  return getAvarageAge(difference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
