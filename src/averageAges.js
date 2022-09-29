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

function addAgePeople(people) {
  people.map((persone) => {
    persone.age = +persone.died - +persone.born;
  });
}

function getAverageAge(array) {
  return (
    Math.round(
      parseFloat(array.reduce((sum, person) => sum + person.age, 0)
      / +array.length) * 100
    ) / 100
  );
}

function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  addAgePeople(people);

  let peopleMen = people.filter((person) => person.sex === 'm');

  century === 0
    ? getAverageAge(peopleMen)
    : peopleMen = peopleMen.filter((person) => {
      return Math.ceil(person.died / 100) === century;
    });

  return getAverageAge(peopleMen);
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

function calculateWomenAverageAge(people, withChildren = false) {
  // write code here
  addAgePeople(people);

  let peopleF = people.filter((person) => person.sex === 'f');

  withChildren === false
    ? getAverageAge(peopleF)
    : peopleF = peopleF.filter((personF) =>
      people.find((child) => child.mother === personF.name)
    );

  return getAverageAge(peopleF);
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
 *
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  // write code here
  addAgePeople(people);

  const peopleF = people.filter((person) => person.sex === 'f');

  const peopleFWithChild = peopleF.filter((personF) =>
    people.find((child) => child.mother === personF.name)
  );
  const peopleChildren = people.filter((child) =>
    peopleFWithChild.find((mother) => child.mother === mother.name)
  );

  function getPair(mother, children) {
    children.map((child) =>
      mother.find((motherF) => {
        if (motherF.name === child.mother) {
          pairs.push([motherF, child]);
        }
      })
    );
  }

  const pairs = [];
  let countetAge = 0;
  const peopleChildM = peopleChildren.filter(
    (person) => person.sex === 'm'
  );

  onlyWithSon === false
    ? getPair(peopleFWithChild, peopleChildren, pairs)
    : getPair(peopleFWithChild, peopleChildM, pairs);

  pairs.map((pair) => {
    countetAge += pair[1].born - pair[0].born;
  });

  return countetAge / pairs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
