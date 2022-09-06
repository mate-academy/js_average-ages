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
  const men = people.filter(person => person.sex === 'm');
  const centuryMen = century ? men.filter(function(item) {
    return Math.ceil(item.died / 100) === century;
  }) : men;
  const years = centuryMen.map(el => el.died - el.born);
  const average = (years.reduce((a, b) => a + b));

  return Math.round(average / centuryMen.length * 100) / 100;
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
  const female = people.filter(person => person.sex === 'f');
  const checkChildren = withChildren ? female.filter(function(person) {
    return people.some(el => el.mother === person.name);
  }) : female;
  const years = checkChildren.map(el => el.died - el.born);
  const average = (years.reduce((a, b) => a + b));

  return Math.round(average / checkChildren.length * 100) / 100;
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
  const female = people.filter(person => person.sex === 'f');

  const withChild = female.filter(woman => {
    return people.filter(person => person.mother === woman.name);
  });

  const children = onlyWithSon
    ? people.filter(person => withChild.some(mother => {
      return mother.name === person.mother && person.sex === 'm';
    }))
    : people.filter(person => {
      return withChild.some(mother => mother.name === person.mother);
    });

  let calc = 0;

  const result = children.reduce(function(prev, item) {
    calc++;

    const mother = withChild.find(el => el.name === item.mother).born;
    const child = item.born;

    return prev + (child - mother);
  }, 0);

  return Math.round(result / calc * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
