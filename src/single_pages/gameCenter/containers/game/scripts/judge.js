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
		 *  4.a
		 *
		 */
		const player = this.player,
			grid = this.grid
		player.running = Judge._checkImpact(grid, player)
		if(player.running){
			grid.updateTank(player)
		}
	}
	static _checkImpact(grid, player){
		const alley = grid._geneAlley(),
			{ posX, posY, offsetX, offsetY, direction} = player

		//check if any endpoint touch other construction
		if(direction === 'w'){
			//this row will be tested
			let row = posY * 2 + Math.floor(offsetY/8),
				col = posX * 2 + Math.floor(offsetX/8)

			//TIP: all the constructions are located at the standard grid,
			//     but tanks may be located with a param 'offset'
			window.p = alley
			if (offsetY <= 1) {
				for (let c = col; c < 2 + col + (offsetX ? 1 : 0); c ++) {
					//either it's running straight into block or the edge of the map
					if (row === 0 || alley[row - 1][col] === 0) return false
				}
				return true
			} else {
				return true
			}
		}else if(direction === 's'){
			return true
		}else if(direction === 'a'){
			return true
		}else if(direction === 'd'){
			return true
		}else{
			throw Error("You cannot change variable 'direction' manually")
		}
	}
	static _checkMap(){

	}
	static _checkCannon(){

	}
}