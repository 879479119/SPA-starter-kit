/**
 * Created by zi on 2017/1/13.
 */

/**
 * this class should store all the status that affect the game,
 *
 */

export default class Judge{
	constructor(grid, map, player, enemies){
		//user data
		this.player = player || {}
		//enemies data
		this.enemies = enemies || {}
		//map data
		this.map = map || {}
		//grid data
		this.grid = grid || {}

	}
	init(){

	}
	//the most important part of this game
	go(){
		/**
		 * steps:
		 *  1.check if user control the tank crash direct into the wall,and move control(change states)
		 *  2.enemies go towards the base, as a whole, the ratio of getting closer is higher than getting further
		 *  3.check cannonball's position, judging if any tank were damaged or any construction damaged,
		 *      - user lose this game if the base were destroyed,
		 *      - blinking enemies leave items after destroyed,
		 *      - user can be more powerful when fetch blinking items,
		 *      - some construction will change state if attacked,
		 *      -
		 *  4.
		 *
		 */
		const player = this.player,
			grid = this.grid
		if(player.running){
			grid.updateTank(player)
		}


	}
	static _checkMap(){

	}
	static _checkCannon(){

	}
}