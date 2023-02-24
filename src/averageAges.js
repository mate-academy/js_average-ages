'use strict';

const getAverage = (arr) => {
  return arr.reduce((sum, el) => (el.died - el.born) + sum, 0) / arr.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let person = people.filter(man => man.sex === 'm');

  person = century
    ? person.filter(boy => Math.ceil(boy.died / 100) === century)
    : person;

  return getAverage(person);
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
  const woman = withChildren
    ? people.filter(
      mayBeMom => people.some(person => person.mother === mayBeMom.name)
    )
    : people.filter(person => person.sex === 'f');

  return getAverage(woman);
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
  const filteredPeople = onlyWithSon
    ? people.filter(child => child.sex === 'm')
    : people;

  const children = filteredPeople.reduce((acc, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return mother ? [...acc, [child, mother]] : acc;
  }, []);

  const ageDifference = children.reduce(
    (sum, [child, mother]) => sum + child.born - mother.born, 0
  );

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
