class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    return this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    let numberFromOriginal = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      numberFromOriginal++;
      currentVampire = currentVampire.creator;
    }

    return numberFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    let juniorVampire = this;
    let seniorVampire = vampire;
    
    if (this.isMoreSeniorThan(vampire)) {
      juniorVampire = vampire;
      seniorVampire = this;
    }
    
    if (!seniorVampire.creator || juniorVampire.creator === seniorVampire || juniorVampire === seniorVampire) {
      return seniorVampire;
    }


    let generationGap = juniorVampire.numberOfVampiresFromOriginal - seniorVampire.numberOfVampiresFromOriginal;

    for (let i = 0; i < generationGap; i++) {
      juniorVampire = juniorVampire.creator;
    }

    while (juniorVampire !== seniorVampire) {
      juniorVampire = juniorVampire.creator;
      seniorVampire = seniorVampire.creator;
    }
    return juniorVampire;
  }
  
}



module.exports = Vampire;

