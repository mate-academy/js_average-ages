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
      parseFloat(array.reduce((sum, x) => sum + x.age, 0) / +array.length) * 100
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

  const peopleM = people.filter((person) => person.sex === 'm');

  if (century === 0) {
    return getAverageAge(peopleM);
  } else {
    const peopleMCentryFilter = peopleM.filter((person) => {
      return Math.ceil(person.died / 100) === century;
    });

    return getAverageAge(peopleMCentryFilter);
  }
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

  const peopleF = people.filter((person) => person.sex === 'f');

  function getMother(person) {
    for (const child of people) {
      if (child.mother === person.name) {
        return true;
      }
    }
  }

  if (withChildren === false) {
    return getAverageAge(peopleF);
  } else {
    const peopleFWithChild = peopleF.filter(getMother);

    return getAverageAge(peopleFWithChild);
  }
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

  function getMother(person) {
    for (const child of people) {
      if (child.mother === person.name) {
        return true;
      }
    }
  }

  function getChild(children) {
    for (const mother of peopleFWithChild) {
      if (mother.name === children.mother) {
        return true;
      }
    }
  }

  const peopleFWithChild = peopleF.filter(getMother);
  const peopleChild = people.filter(getChild);

  function getPair(peopleChild1, peopleFWithChild1, pair) {
    for (const child of peopleChild1) {
      for (const mother of peopleFWithChild1) {
        if (mother.name === child.mother) {
          pair.push([mother, child]);
        }
      }
    }
  };

  const pairs = [];
  let countetAge = 0;

  if (onlyWithSon === false) {
    getPair(peopleChild, peopleFWithChild, pairs);
  } else {
    const peopleChildM = peopleChild.filter((person) => person.sex === 'm');

    getPair(peopleChildM, peopleFWithChild, pairs);
  }

  for (const pair of pairs) {
    countetAge += pair[1].born - pair[0].born;
  }

  return countetAge / pairs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
