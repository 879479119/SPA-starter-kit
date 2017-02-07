/**
 * Created by zi on 2017/1/13.
 */

/**
 * this class should store all the status that affect the game,
 *
 */

export default class Judge{
	constructor(grid, map, player, fireController, enemies){
		//user data
		this.player = player || {}
		//enemies data
		this.enemies = enemies || {}
		//map data
		this.map = map || {}
		//grid data
		this.grid = grid || {}
		//fire data
		this.fireController = fireController
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
			grid = this.grid,
			fireController = this.fireController
		Judge._checkImpact(grid, player)
		if(player.key_down && player.running){
			grid.updateTank(player)
		}
		grid.updateFire(fireController)
	}
	static _checkImpact(grid, player){
		const alley = grid._geneAlley(),
			{ posX, posY, offsetX, offsetY, direction} = player

		let row = posY * 2 + Math.floor(offsetY/8),
			col = posX * 2 + Math.floor(offsetX/8)

		//check if any endpoint touch other construction
		if(direction === 'w'){
			//TIP: all the constructions are located at the standard grid,
			//     but tanks may be located with a param 'offset'
			if (offsetY <= 1) {
				for (let c = col; c < 2 + col + (offsetX ? 1 : 0); c ++) {
					//either it's running straight into block or the edge of the map
					if (row === 0 || alley[row - 1][c] === 0){
						player.running = false
						player.offsetY = 0
						return
					}
				}
				player.running = true
			} else {
				player.running = true
			}
		}else if(direction === 's'){
			if (offsetY >= 16) {
				for (let c = col; c < 2 + col + (offsetX ? 1 : 0); c ++) {
					if (row === alley.length || alley[row + 1][c] === 0){
						player.running = false
						player.offsetY = 16
						return
					}
				}
				player.running = true

			} else {
				player.running = true

			}
		}else if(direction === 'a'){
			if (offsetX <= 0) {
				for (let r = row; r < 2 + row + (offsetY ? 1 : 0); r ++) {
					if (col === 0 || alley[r][col - 1] === 0){
						player.offsetX = 0
						player.running = false
						return
					}
				}
				player.running = true
			} else {
				player.running = true
			}
		}else if(direction === 'd'){
			if (offsetX >= 16) {
				for (let r = row; r < 2 + row + (offsetY ? 1 : 0); r ++) {
					if (col === alley[0].length || alley[r][col + 1] === 0) {
						if (col === 0 || alley[r][col - 1] === 0) {
							player.offsetX = 16
							player.running = false
							return
						}
					}
				}
				player.running = true
			} else {
				player.running = true
			}
		}else{
			throw Error("You cannot change variable 'direction' manually")
		}
	}
	static _checkMap(){

	}
	static _checkCannon(){

	}
}