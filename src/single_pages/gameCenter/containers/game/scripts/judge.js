/**
 * this class should store all the status that affect the game,
 */

import { Enemy, EnemyController } from './tank'

export default class Judge{
	constructor(grid, map, player, fireController, enemyBases, enemyController){
		//user data
		this._player = player || {}
		//enemies data
		this._enemyBases = enemyBases || {}
		//map data
		this._map = map || {}
		//grid data
		this._grid = grid || {}
		//fire data
		this._fireController = fireController || {}
		//shown enemies
		this._enemyController = enemyController || {}
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
			fireController = this._fireController,
			enemyBases = this._enemyBases,
			enemyController = this._enemyController

		//enemies are born after a period
		Judge._checkBirth(grid, enemyBases, enemyController)
		//check tanks and construction
		Judge._checkImpact(grid, player)
		//check fire & construction & tanks
		//TODO: ignore enemies
		Judge._checkCannon(grid, player, fireController)

		grid.drawConstruction()
		grid.updateTank(player, player.key_down && player.running)
		enemyController.tankArr.map(item=>{
			grid.updateTank(item)
		})
		grid.updateFire(fireController)
	}
	static _checkImpact(grid, player){
		const alley = grid.getAlley(),
			{ posX, posY, offsetX, offsetY, direction} = player

		window.a = alley
		window.f = offsetY

		let row = posY, col = posX

		//check if any endpoint touch other construction
		if(direction === 'w'){
			//TIP: all the constructions are located at the standard grid,
			//     but tanks may be located with a param 'offset'
			if (offsetY <= 0) {
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
			if (offsetY <= 1) {
				for (let c = col; c < 2 + col + (offsetX ? 1 : 0); c ++) {
					if (row === alley.length || alley[row + 2][c] === 0){
						player.running = false
						player.offsetY = 0
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
			if (offsetX <= 1) {
				for (let r = row; r < 2 + row + (offsetY ? 1 : 0); r ++) {
					if (col === alley[0].length || alley[r][col + 2] === 0) {
						player.offsetX = 0
						player.running = false
						return
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
	static _checkBirth(grid, enemyBases, enemyC){
		enemyBases.forEach((item) => {
			if(++ item.frameCounter % item.bornInterval === 0){
				if(item.bornOne() !== -1){
					grid.birthAnimation(item, true)
				}
			}
			if(item.blinkStage < 40) grid.birthAnimation(item)
			else if(item.blinkStage ++ === 40){
				let type = item.type[Math.random() * item.type.length >>> 0]
				let enemy = new Enemy(item.posX,item.posY,type)
				enemyC.addTank(enemy)
				grid.updateEnemy(enemy)
				// item.blinkStage = 0
			}
		})
	}
	static _checkCannon(grid, player, fireC) {
		/**
		 * the tank of player will be destroyed if enemy's fire reached and vice versa,
		 * because we can tell the fire whether it's friendly judging from 'from_ally'
		 */
		if (fireC.fireArr.length === 0) return
		const alley = grid.material

		for(let index in fireC.fireArr){
			const { accuracyX = 0, accuracyY = 0, direction, size, from_ally } = fireC.fireArr[index]
			let col = Math.floor(accuracyX / grid.step),
				row = Math.floor(accuracyY / grid.step),
				oX = accuracyX % grid.step,
				oY = accuracyY % grid.step

			console.log(accuracyX,accuracyY,oY)

			let checkConstruction = () => {
				if(row == 0 && (direction == 'w' || direction == 's')) return
				if(col == 0 && (direction == 'a' || direction == 'd')) return
				if((accuracyY < 0) || (accuracyX < 0) || (accuracyY - size >= alley.length * grid.step) || (accuracyX - size >= alley[0].length * grid.step)) {
					fireOnBlock(index)
					fireC.fireGone(index)
					return
				}
				let over = false
				switch (direction){
					case 'w':
						let w1 = alley[row - 1][col], w2 = alley[row - 1][col + 1]
						if(w1 == 4 || w2 == 4){
							//the top block
							if(oY <= 1 && w1 == 4){fireOnBlock(index,col,row - 1)}
							//the block at right
							if(oY <= 1 && oX >= grid.step - size && w2 == 4){fireOnBlock(index,index,col + 1,row - 1)}
						}else if(w1 == 3 || w2 == 3){
							if(oY <= 1 && w1 == 3){fireOnBlock(index)} //draw a boom
							if(oY <= 1 && oX >= grid.step - size && w2 == 3){fireOnBlock(index)} //boom
						}
						break
					case 's':
						let s1 = alley[row + 1][col], s2 = alley[row + 1][col + 1]
						if(s1 == 4 || s2 == 4){
							if(oY + size >= grid.step && s1 == 4){fireOnBlock(index,col,row + 1)}
							if(oX >= grid.step - size && oY + size >= grid.step && s2 == 4){fireOnBlock(index,col + 1,row + 1)}
						}else if(s1 == 3 || s2 == 3){
							if(oY + size >= grid.step && s1 == 3){fireOnBlock(index)} //draw a boom
							if(oX >= grid.step - size && oY + size >= grid.step && s2 == 3){fireOnBlock(index)} //boom
						}
						break
					case 'a':
						let a1 = alley[row][col - 1], a2 = alley[row + 1][col - 1]
						if(a1 == 4 || a2 == 4){
							if(oX <= 1 && a1 == 4){fireOnBlock(index,col - 1,row)}
							if(oX <= 1 && oY >= grid.step - size && a2 == 4){fireOnBlock(index,col - 1,row + 1)}
						}else if(a1 == 3 || a2 == 3){
							if(oX <= 1 && a1 == 3){fireOnBlock(index)} //draw a boom
							if(oX <= 1 && oY >= grid.step - size && a2 == 3){fireOnBlock(index)} //boom
						}
						break
					case 'd':
						let d1 = alley[row][col + 1], d2 = alley[row + 1][col + 1]
						if(d1 == 4 || d2 == 4){
							if(oX + size >= grid.step && d1 == 4){fireOnBlock(index,col + 1,row)}
							if(oY >= grid.step - size && oX + size >= grid.step && d2 == 4){fireOnBlock(index,col + 1,row + 1)}
						}else if(d1 == 3 || d2 == 3){
							if(oX + size >= grid.step && d1 == 3){fireOnBlock(index)} //draw a boom
							if(oY >= grid.step - size && oX + size >= grid.step && d2 == 3){fireOnBlock(index)} //boom
						}
						break
					default:
						throw Error("WRONG DIRECTION")
				}

				if(over === true) fireC.fireGone(index)

				/**
				 * if user pass 'col',the block will be destroyed!
				 * and fire would be destroyed only when the function is called
				 */
				function fireOnBlock(index, col, row) {
					grid.fireOnBlock(fireC.fireArr[index], col, row)
					over = true
				}
			}

			let checkPlayer = () => {

				const { posX, posY, offsetX, offsetY } = player

				let pX = posX * grid.step + offsetX,
					pY = posY * grid.step + offsetY

				if((Math.abs(pX - accuracyX)) > 2) return
				if((Math.abs(pY - accuracyY)) > 2) return

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
			//check Construction first
			checkConstruction()
			//then the player and enemies
			checkPlayer()
		}
	}
}