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
  const men = people.filter((person) => {
    return !century ? person.sex === 'm' : person.sex
    === 'm' && Math.ceil(person.died / 100) === century;
  }
  );

  const menWithAge = men.map((man) => {
    return {
      age: man.died - man.born,
    };
  });

  const totalAge = menWithAge.reduce((sum, { age }) => sum + age, 0);

  return totalAge / menWithAge.length;
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
  const peopleWithChild = people.map((human) => {
    return {
      ...human,
      child: people.find((kid) => kid.mother === human.name),
    };
  });

  const women = peopleWithChild.filter((person) => {
    return withChildren ? person.sex
      === 'f' && person.child : person.sex === 'f';
  }
  );

  const womenWithAge = women.map((woman) => {
    return {
      age: woman.died - woman.born,
    };
  });

  const totalAge = womenWithAge.reduce((sum, { age }) => sum + age, 0);

  return totalAge / womenWithAge.length;
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
  const kidList = onlyWithSon
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)
      && child.sex === 'm'))
    : people.filter(child =>
      (people.find(mother => child.mother === mother.name)));

  const ageDifference = kidList.reduce((sum, child) => {
    return sum + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / kidList.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
