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
  const maleFIltered = people.filter(person => person.sex === 'm'
   && (century ? Math.ceil(person.died / 100) === century : true));

  const maleAge = maleFIltered.map(person => person.died - person.born);

  return averageAge(maleAge);
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
  const femaleFiltered = people.filter(person => person.sex === 'f'
  && (withChildren
    ? people.some((child) => child.mother === person.name)
    : true
  ));

  const femaleAge = femaleFiltered.map(person => person.died - person.born);

  return averageAge(femaleAge);
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
  const hasMother = (child) => {
    return people.some(mother => mother.name === child.mother);
  };

  const children = (onlyWithSon)
    ? people.filter(child => hasMother(child) && child.sex === 'm')
    : people.filter(child => hasMother(child)
    );
  const ageDif = children.map(child => child.born
          - people.find(person => person.name === child.mother).born);

  return averageAge(ageDif);
}

function averageAge(age) {
  return age.reduce((acc, item) => acc + item, 0) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
