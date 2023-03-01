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
  const filteredByMan = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return getAvarageAge(filteredByMan);
}

function getAvarageAge(value) {
  const sum
  = value.reduce((result, man) => result + man.died - man.born, 0);

  return sum / value.length;
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
  const filteredByWoman = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  const womenAverageAge = filteredByWoman.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0);

  return womenAverageAge / filteredByWoman.length;
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
  const children = people.filter(child =>
    onlyWithSon
      // ? child.sex === 'm' && people.some(mother =>
      //   mother.name === child.mother)
      // : people.some(mother => mother.name === child.mother)
      ? child.sex === 'm' && getMother(child, people)
      : getMother(child, people)
  );

  const averageAgeDiff = children.reduce((aveAge, child) => {
    const mum = people.find(mother => mother.name === child.mother);

    return aveAge + ((child.born - mum.born));
  }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

function getMother(val, people) {
  return people.some(mother => mother.name === val.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
