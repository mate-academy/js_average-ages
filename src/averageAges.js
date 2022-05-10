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
  const arrayOfMen = people.filter(human => human.sex === 'm');

  const filteredArrOfMen = century
    ? arrayOfMen.filter(man => Math.ceil(man.died / 100) === century)
    : arrayOfMen;

  const menAverageAge = filteredArrOfMen.reduce((prevValue, year) => {
    return prevValue + (year.died - year.born);
  }, 0) / filteredArrOfMen.length;

  return menAverageAge;
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
  const arrayOfWomen = people.filter(human => human.sex === 'f');

  const filteredArrOfWomen = withChildren
    ? arrayOfWomen.filter(woman => people.some(
      human => human.mother === woman.name
    ))
    : arrayOfWomen;

  const womenAverageAge = filteredArrOfWomen.reduce((prev, year) => {
    return prev + (year.died - year.born);
  }, 0) / filteredArrOfWomen.length;

  return womenAverageAge;
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
  const avg = (numbers) => {
    const sum = numbers.reduce((prev, number) => prev + number, 0);

    return sum / numbers.length;
  };

  const women = onlyWithSon
    ? people.filter(human => human.sex === 'f'
    && people.some(({ sex, mother }) => sex === 'm' && mother === human.name))
    : people.filter(human => human.sex === 'f'
    && people.some(({ mother }) => mother === human.name));

  const ages = [];

  women.forEach(woman => {
    const children = onlyWithSon
      ? people.filter(({ sex, mother }) => sex === 'm' && mother === woman.name)
      : people.filter(({ mother }) => mother === woman.name);

    const childrensAge = children.map(({ born }) => born - woman.born);

    ages.push(...childrensAge);
  });

  return avg(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
