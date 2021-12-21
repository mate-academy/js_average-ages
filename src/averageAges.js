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
  const peoples = people.filter(
    peop => century !== undefined
      ? peop.sex === 'm' && Math.ceil(peop.died / 100) === century
      : peop.sex === 'm'
  );
  const ages = peoples.map(peop => peop.died - peop.born);
  const result = ages.reduce((a, b) => a + b / ages.length, 0);

  return +result.toFixed(2);
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
  const peoples = people.filter(
    peop => withChildren !== undefined
      ? peop.sex === 'f' && people.some(
        human => human.mother === peop.name
      )
      : peop.sex === 'f'
  );
  const ages = peoples.map(peop => peop.died - peop.born);
  const result = ages.reduce((a, b) => a + b / ages.length, 0);

  return +result.toFixed(2);
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
  const children = people.filter(child => onlyWithSon
    ? people.find(mother => mother.name === child.mother)
    && child.sex === 'm'
    : people.find(mother => mother.name === child.mother)
  );

  let age = 0;

  children.forEach(element => {
    people.find(item => {
      if (item.name === element.mother) {
        age += element.born - item.born;
      }
    });
  });
  age /= children.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
