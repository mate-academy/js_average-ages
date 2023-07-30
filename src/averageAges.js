'use strict';

/**
//Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) =>
    century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm',
  );

  const ageSum = men
    .map(({ died, born }) => died - born)
    .reduce((prev, age) => (prev + age), 0);

  return ageSum / men.length;
}

/**
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ name, sex }, indx, arr) =>
    withChildren
      ? sex === 'f' && arr.some(({ mother }) => mother === name)
      : sex === 'f',
  );

  const ageSum = women
    .map(({ died, born }) => died - born)
    .reduce((prev, age) => prev + age, 0);

  return ageSum / women.length;
}

/**
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(({ mother, sex }) =>
    onlyWithSon
      ? sex === 'm' && (mother)
      : mother
  );

  const ageDiffArr = children
    .map((child) => {
      const mother = people.find((person) => person.name === child.mother);

      return (mother) ? child.born - mother.born : 0;
    })
    .filter(ageDiff => ageDiff > 0);

  const ageDiffSum = ageDiffArr.reduce((prev, age) => prev + age, 0);

  return ageDiffSum / ageDiffArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
