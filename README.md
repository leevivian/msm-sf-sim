# msm-sf-sim
Simulator for MapleStory M Star Force Level Enhancements

After hearing complaints from maplers that "5%? More like 95%", this is my project to test and visualize the bounds of RNG.

### What is Star Force Level?
Star Force level is the amount of stars that is on a weapon or armor equipment. In order to access Star Force maps, which are maps that give increased character level experience, a player must increase their cumulative star force level across their equips. Star force enhancement is a core element of game progression, and a good chunk of mesos are spent towards it.

The four states of star force enhancement are as follows:
1. Success: Star force level has increased by 1
2. Maintained: Star force level has stayed the same
3. Degraded: Star force level has decreased by 1
4. Destroyed: Star force level has stayed the same, but the equipment is destroyed. The player is required to get the same equipment and transfer it to the broken one before continuing to increase its star force level. 

### What does this simulator do?
Written in vanilla Javascript, HTML, and CSS, this simulator records the number of attempts and total mesos (the main game currency) it takes to get from Star Force Level x to Star Force Level y. The probabilities were retrieved from [Lukishi's Enhancement Table](https://lukishi.com/enhancement-table/). Because actual star force enhancement gets expensive and risky quite quickly, I think this simulator is an entertaining way of testing "luck" and RNG.
