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
  const foundMan = century
    ? people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const yearOfLife = century
    ? foundMan.map(year => year.died - year.born).reduce((a, b) => a + b)
    : foundMan.map(year => year.died - year.born).reduce((a, b) => a + b);

  return yearOfLife / foundMan.length;
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
  let foundWoman = [];
  let yearOfLife = 0;
  const motherWithChildren = [];

  foundWoman = people
    .filter(woman => woman.sex === 'f');

  foundWoman.forEach(element => {
    if (people.some(woman => element.name === woman.mother)) {
      motherWithChildren.push(element);
    }
  });

  yearOfLife = withChildren
    ? motherWithChildren
      .map(year => year.died - year.born)
      .reduce((a, b) => a + b)

    : foundWoman
      .map(year => year.died - year.born)
      .reduce((a, b) => a + b);

  const age = withChildren
    ? yearOfLife / motherWithChildren.length
    : yearOfLife / foundWoman.length;

  return age;
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
  const foundMan = people.filter(man => man.sex === 'm');
  let age = 0;
  let count = 0;

  if (onlyWithSon) {
    foundMan.forEach(man => {
      people.forEach(woman => {
        if (man.mother === woman.name) {
          age += (man.born - woman.born);
          count++;
        }
      });
    });
  } else {
    people.forEach(man => {
      people.forEach(woman => {
        if (man.mother === woman.name) {
          age += (man.born - woman.born);
          count++;
        }
      });
    });
  }

  return age / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
