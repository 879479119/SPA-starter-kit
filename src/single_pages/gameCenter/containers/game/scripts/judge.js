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
		this._player = player || {}
		//enemies data
		this._enemies = enemies || {}
		//map data
		this._map = map || {}
		//grid data
		this._grid = grid || {}
		//fire data
		this._fireController = fireController || {}
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
		const player = this._player,
			grid = this._grid,
			fireController = this._fireController
		//check tanks and construction
		Judge._checkImpact(grid, player)
		//check fire & construction & tanks
		//TODO: ignore enemies
		Judge._checkCannon(grid, player, fireController)

		grid.drawConstruction()
		grid.updateTank(player, player.key_down && player.running)
		grid.updateFire(fireController)
	}
	static _checkImpact(grid, player){
		const alley = grid.getAlley(),
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
					if (row === 0 || alley[row - 1][c] > 1){
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
					if (row === alley.length || alley[row + 1][c] > 1){
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
					if (col === 0 || alley[r][col - 1] > 1){
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
						if (col === 0 || alley[r][col - 1] > 1) {
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
	static _checkCannon(grid, player, fireC) {
		/**
		 * the tank of player will be destroyed if enemy's fire reached and vice versa,
		 * because we can tell the fire whether it's friendly judging from 'from_ally'
		 */
		if (fireC.fireArr.length === 0) return
		const alley = grid.getAlley()

		for(let fire of fireC.fireArr){
			const { accuracyX, accuracyY, direction, size, from_ally } = fire

			let col = Math.floor(accuracyX / grid.step),
				row = Math.floor(accuracyY / grid.step),
				oX = accuracyX % grid.step,
				oY = accuracyY % grid.step

			//check Construction first
			checkConstruction()
			//then the player and enemies
			checkPlayer()

			function checkConstruction() {
				//TIP: if the fire is away from construction
				if(oX > 1 && oX < grid.step - 1) return
				if(oY > 1 && oY < grid.step - 1) return
				let w1 = alley[col][row - 1], w2 = alley[col + 1][row - 1]
				let s1 = alley[col][row + 1], s2 = alley[col + 1][row + 1]
				let a1 = alley[col - 1][row], a2 = alley[col - 1][row + 1]
				let d1 = alley[col + 1][row], d2 = alley[col + 1][row + 1]
				switch (direction){
					case 'w':
						if(w1 == 4 || w2 == 4){
							//the top block
							if(w1 == 4){grid.destroyBlock(col,row - 1)}
							//the block at right
							if(oX >= grid.step - size && w2 == 4){grid.destroyBlock(col + 1,row - 1)}
						}else if(w1 == 3 || w2 == 3){
							if(w1 == 3){} //draw a boom
							if(oX >= grid.step - size && w2 == 3){} //boom
						}
						break
					case 's':
						if(s1 == 4 || s2 == 4){
							if(oY + size >= grid.step && s1 == 4){grid.destroyBlock(col,row + 1)}
							if(oX >= grid.step - size && oY + size >= grid.step && s2 == 4){grid.destroyBlock(col + 1,row + 1)}
						}else if(s1 == 3 || s2 == 3){
							if(oY + size >= grid.step && s1 == 3){} //draw a boom
							if(oX >= grid.step - size && oY + size >= grid.step && s2 == 3){} //boom
						}
						break
					case 'a':
						if(a1 == 4 || a2 == 4){
							if(a1 == 4){grid.destroyBlock(col - 1,row)}
							if(oY >= grid.step - size && a2 == 4){grid.destroyBlock(col - 1,row + 1)}
						}else if(a1 == 3 || a2 == 3){
							if(a1 == 3){} //draw a boom
							if(oY >= grid.step - size && a2 == 3){} //boom
						}
						break
					case 'd':
						if(d1 == 4 || d2 == 4){
							if(oX + size >= grid.step && d1 == 4){grid.destroyBlock(col + 1,row)}
							if(oY >= grid.step - size && oX + size >= grid.step && d2 == 4){grid.destroyBlock(col + 1,row + 1)}
						}else if(d1 == 3 || d2 == 3){
							if(oX + size >= grid.step && d1 == 3){} //draw a boom
							if(oY >= grid.step - size && oX + size >= grid.step && d2 == 3){} //boom
						}
						break
					default:
						throw Error("WRONG DIRECTION")
				}
			}

			function checkPlayer() {

				const { posX, posY, offsetX, offsetY } = player

				let pX = posX * grid.len + offsetX,
					pY = posY * grid.len + offsetY

				if((Math.abs(pX - accuracyX)) > 3) return
				if((Math.abs(pY - accuracyY)) > 3) return

				switch (direction){
					case 'w':case 's':
						if((pX - accuracyX < size && pX - accuracyX > grid.len && from_ally === false)
							&& (pX - accuracyX <= grid.len || accuracyX - pX <= 0)){
							player.getAttacked()
							//TODO: special effect
						}
						break
					case 'a':case 'd':
						if((pY - accuracyY < size && pY - accuracyY > grid.len && from_ally === false)
							&& (pY - accuracyY <= grid.len || accuracyY - pX <= 0)){
							player.getAttacked()
							//TODO: special effect
						}
						break
					default:
						throw Error("WRONG DIRECTION")
				}
			}
		}
	}
}