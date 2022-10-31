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
  // here we filter males for specific century, either we just return males.
  const male = people.filter(person => century
    // here we find all mens in given century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    // here we find all mens
    : person.sex === 'm'
  );

  return sumOfAge(male);
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
  // here we filter females for having childrens, either we just return females.
  const female = people.filter(person => withChildren
    // here we find all womens with childrens
    ? person.sex === 'f' && people.find(child => child.mother === person.name)
    // here we find all womens
    : person.sex === 'f'
  );

  return sumOfAge(female);
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
 *~
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    // here we find mother only with son
    ? child.mother && people.find(person => person.name === child.mother)
    && child.sex === 'm'
    // here we find mother and her child
    : child.mother && people.find(person => person.name === child.mother)
  );

  const ageDiff = children.reduce((x, child) => {
    // here we find all mothers
    const mother = people.find(person => person.name === child.mother);

    // here we find age difference between mothers & childrens
    return x + child.born - mother.born;
  }, 0);

  return ageDiff / children.length;
}

function sumOfAge(people) {
  // this is our function for count total age
  const avgAge = people.reduce((x, year) => x + (year.died - year.born), 0);

  return avgAge / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
