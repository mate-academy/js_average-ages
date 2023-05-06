'use strict';

function calcAverage(totalCount, counts) {
  return Math.round((totalCount / counts) * 100) / 100;
}

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
  const menArray = people.filter(man => man.sex === 'm');
  const requiredMen
    = century
      ? menArray.filter(man => century === Math.ceil(man.died / 100))
      : menArray;

  const menDataAges = requiredMen.reduce((total, man) => {
    total.totalAge += (man.died - man.born);
    total.counter += 1;

    return total;
  }, {
    totalAge: 0, counter: 0,
  });

  const average
    = calcAverage(menDataAges.totalAge, menDataAges.counter);

  return average;
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
  const personsMothers = people.reduce((mothersArray, person) => {
    mothersArray.push(person.mother);

    return mothersArray;
  }, []);

  const womenWithChildren
    = withChildren
      ? people.filter(person => {
        return person.sex === 'f' && personsMothers.includes(person.name);
      })
      : people.filter(person => person.sex === 'f');

  const womenDataAll = womenWithChildren.reduce((total, person) => {
    total.totalAge += (person.died - person.born);
    total.counter += 1;

    return total;
  }, {
    totalAge: 0, counter: 0,
  });

  const average = calcAverage(womenDataAll.totalAge, womenDataAll.counter);

  return average;
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
  const childrenHasMother
  = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother)
    : people.filter(person => person.mother);
  const childrenDataAges = childrenHasMother.reduce((total, child) => {
    const parent = people.find(person => person.name === child.mother);
    const ageDiff = parent ? child.born - parent.born : 0;
    const counter = parent ? 1 : 0;

    total.totalAge += ageDiff;
    total.counter += counter;

    return total;
  }, {
    totalAge: 0, counter: 0,
  });

  const average
    = calcAverage(childrenDataAges.totalAge, childrenDataAges.counter);

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
