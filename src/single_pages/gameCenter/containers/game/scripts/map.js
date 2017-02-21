/**
 * Created by RockSAMA on 2017/1/13.
 */

/**
 * TIP: if you want to deconstruct a class, you may use 'const' instead of
 *      'let', because its prop may be changed though it's a number or string
 */

/**
 * the canvas is divided into lots of pieces called 'block',
 * and one block consists of 16 step boxes,
 * a step box is made up of 2 * 2 pixel square.
 *
 * for tanks,it can go several steps instead of pixel,
 * you can simply get an idea that passing a block needs four steps.
 *
 * since the canvas does need to draw from head to toe,we just clear
 * the area needed to save time for complication of calculation
 */

/**
 * there is three types of 'small blocks':
 *  0 - void, fire & tank could pass, e.g: VOID
 *  1 - void, fire & tank could pass, e.g: GRASS
 *  2 - unreachable, fire can pass, but tank doesn't, e.g: WATER
 *  3 - hard, only level 3 fire can destroy, e.g: STEEL
 *  4 - destroyable, fire can destroy, e.g: BLOCK
 */

//noinspection JSUnresolvedVariable
import { ImageManager } from './Manager'
import { EnemyBase } from './tank'

const MAP_TEMPLATE = {
	size: {
		width: 36,
		height: 22
	},
	startPosition: [{
		x: 2,
		y: 2
	}],
	enemies: [
		{ x: 0, y: 0, type: [3,4] },
		{ x: 15, y: 9, type: [0,1,2,3,4] },
		{ x: 30, y: 14, type: [0,1,2] },
	],
	material: [
		[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
		[0,0,0,0,2,2,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,3,3,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,3,3,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,],
	]
}

//localStorage.setItem('mapList',JSON.stringify([MAP_TEMPLATE]))

export class Canvas{
	constructor(grid, map){

		let dom = grid.ele
		this.grid = grid
		this.step = 8
		this.map = map
		this.width = dom.width
		this.height = dom.height
		this.sX = 0
		this.sY = 0
		this.oX = 0
		this.oY = 0
		//the params that we use to draw
		this.endCol = 0
		this.endRow = 0

		//create a new canvas and set some attributes
		this.ele = document.createElement("canvas")
		this.ele.width = dom.width
		this.ele.height = dom.height
		this.ele.style.position = "absolute"
		this.ele.style.left = 0
		this.ele.style.top = 0
		document.querySelector("#canvas-container").appendChild(this.ele)

		this.c = this.ele.getContext('2d')
	}
	setOffset(oX,oY){
		this.oX = oX
		this.oY = oY
	}
	startSelection(col, row){
		this.sX = col
		this.sY = row
		console.log(this.sX,this.sY)
	}
	/**
	 * draw a grid when run 'drawSelection' is what a low performance,
	 * to avoid unnecessary CPU cost, this function is closed by annotated
	 */
	drawSelection(col, row){
		const { oX, oY, sX, sY } = this
		this.c.clearRect(0,0,this.ele.width,this.ele.height)
		// this.grid.drawLine(this)
		this.c.fillStyle = "rgba(255,255,255,0.5)"
		this.c.fillRect(oX+sX*8,oY+sY*8,(col-sX)*8,(row-sY)*8)

		//TIP: the selection tool sometimes is not the same as what we draw
		//therefore, we can store the status in memory
		this.endCol = col
		this.endRow = row
	}
	clearSelection(){
		this.c.clearRect(0,0,this.ele.width,this.ele.height)
		// this.grid.drawLine(this)
	}
}

/**
 * the class grid controls the canvas,and store some data
 */
export class Grid{
	constructor(width, height){
		// localStorage.setItem('mapList',JSON.stringify([MAP_TEMPLATE]))
		/*the canvas must be width 800px,height 400px*/
		this.width = width || 800
		this.height = height || 400
		this.ele = window.document.querySelector("#canvas")
		this.c = this.ele.getContext('2d')
		this.step = 8       //step means how many pixels tank goes when press button, it's like "control resolution ratio"
		this.gridBlock = 2  //a block consists of 16 pixels
		this.len = this.gridBlock * this.step
	}
	init(){
		this.c.fillStyle = "#000"
		this.c.fillRect(0,0,this.width,this.height)
	}
	/*basic methods*/
	_drawBlock(row, col, type, self){
		if(self === undefined) self = this
		let x = col * self.step + this.oX,
			y = row * self.step + this.oY,
			img = ImageManager.getBitMap(type)
		if(type === "void"){
			self.c.fillStyle = "#000"
			self.c.fillRect(x, y, self.step, self.step)
			return
		}
		img && self.c.drawImage(img, x, y, self.step, self.step)
	}
	_drawGiantBlock(col, row, type, self, accuracy= false){
		if(self === undefined) self = this
		let x = accuracy ? col : col * self.step,
			y = accuracy ? row : row * self.step,
			img = ImageManager.getBitMap(type)
		img && self.c.drawImage(img, x, y, self.len, self.len)
	}
	static _adaptor(material){
		return material.map(k=>{
			return k.map(k=>Grid.materialData[k])
		})
	}
	//add all the blocks here
	static get materialData(){
		return {
			0: 0,
			1: "gra",
			2: "wate",
			3: "stee",
			4: "wall"
		}
	}
}


export class GameGrid extends Grid{
	constructor(...props){
		super(...props)
		this.oX = 0
		this.oY = 0

		//it's an Matrix which shows where the tanks could go
		this.alley = []

		const mapSourceList = Map.getMapList(),
			{ material } = mapSourceList[0]
		this.map = mapSourceList[0]
		this.material = material
	}
	/*basic methods*/
	init(){
		super.init()
		this.dummyGrid = new DummyGrid()
	}
	_geneAlley(){
		const material = this.material,
			width = material[0].length,
			height = material.length
		let gridValid = []

		/**
		 * there is three types of 'small blocks':
		 *  0 - void, fire & tank could pass, e.g: VOID
		 *  1 - void, fire & tank could pass, e.g: GRASS
		 *  2 - unreachable, fire can pass, but tank doesn't, e.g: WATER
		 *  3 - hard, only level 3 fire can destroy, e.g: STEEL
		 *  4 - destroyable, fire can destroy, e.g: BLOCK
		 */


		for(let row = 0;row < height;row ++){
			let rowArr = []

			for(let col = 0;col < width;col ++){
				if (material[row][col] === 0 || material[row][col] === 1){
					rowArr.push(1)
				}else {
					rowArr.push(0)
				}
			}

			//store the data and clear cache
			//TIP: I used to write like 'gridValid.push(rowArr1, rowArr2)', grid gets the references instead
			//     once set rowArr.length to 0, grid turns to be void
			gridValid.push([...rowArr])
			rowArr.length = 0
		}
		this.alley = gridValid
		return gridValid
	}
	/*some special methods*/
	_drawTank(){
		const mapSourceList = Map.getMapList(),
			{ startPosition : [{ x, y }] } = mapSourceList[0]

		this._drawPlayer(x,y)
	}
	_drawPlayer(x, y){
		this._drawGiantBlock(x, y, 'p1tankU')
	}
	_drawFire(x, y, size = 4){
		let	img = ImageManager.getBitMap('ball2')
		img && this.c.drawImage(img, x, y, size, size)
	}
	/*export methods*/
	getAlley(init = false){
		if(init) this._geneAlley()
		else return this.alley
	}
	drawConstruction(){

		const { size: { width, height} } = this.map,
			material = this.material

		let blocks = Grid._adaptor(material)

		for(let row = 0;row < height;row ++){
			for(let col = 0;col < width;col ++){
				this._drawBlock(row, col, blocks[row][col])
			}
		}

	}
	updateEnemy(enemy){
		this.updateTank(enemy)
	}
	birthAnimation(enemyBase, init= false){
		if(init === true) enemyBase.blinkStage = 0
		let { posX, posY, blinkStage } = enemyBase
		this._drawGiantBlock(posX,posY,"born"+EnemyBase.bornPic[blinkStage],this)
		enemyBase.blinkStage ++
	}
	blastAnimation(tank, init= false){
		//TODO: blast animation
		if(init === true) tank.deadStage = 1
		else tank.deadStage ++
		const { posX, posY, offsetX, offsetY } = tank
		let aX = posX * this.step + offsetX
		let aY = posY * this.step + offsetY
		this._drawGiantBlock(aX,aY,"blast"+tank.deadStage,this,true)
	}
	updateTank(tank, run = false){
		//in ideal situation(60Hz), the tank can go $speed*10 pixel one second
		let {posX, posY, offsetX, offsetY, speed, direction, type, ally} = tank
		let move = speed * 10 / 60
		let tankName = ally ? 'p1tankU' : ['p1tankU','enemy1','enemy2','enemy3','p2tankF'][type]

		//TIP: DummyGrid is a canvas buffer which provides a transformed image
		let dummy = this.dummyGrid
		let degree = 0

		if(run === false){
			//interesting usage
			let d = [0,90,180,270]['wdsa'.indexOf(direction)]

			/**
			 * when tanks are crushing straight into the block, we can do some
			 * compatible work to make it easier to pass an alley
			 */

			if(offsetX < 2) tank.offsetX = 0
			else if(offsetX > 6){
				tank.posX ++
				tank.offsetX = 0
			}

			if(offsetY < 2) tank.offsetY = 0
			else if(offsetY > 6){
				tank.posY ++
				tank.offsetY = 0
			}

			this.c.drawImage(
				dummy._getRotateBlock(tankName,d),
				posX * this.step + offsetX,
				posY * this.step + offsetY,
				this.len, this.len
			)
			return
		}
		switch (true){
			case direction == 'w':
				if(offsetY < 0){
					tank.posY --
					tank.offsetY = 7.9
				}else tank.offsetY = offsetY - move
				//TIP: because calculating pixel will cause some colored pixel left,
				//     so we just clear a double size of it
				// this._clearArea(posX,tank.posY,offsetX,tank.offsetY + 2 * move)
				degree = 0
				break
			case direction == 's':
				if(offsetY >= 8){
					tank.posY ++
					tank.offsetY = 0
				}else tank.offsetY = offsetY + move
				// this._clearArea(posX,tank.posY,offsetX,tank.offsetY - 2 * move)
				degree = 180
				break
			case direction == 'a':
				if(offsetX < 0){
					tank.posX --
					tank.offsetX = 7.9
				}else tank.offsetX = offsetX - move
				// this._clearArea(tank.posX,posY,tank.offsetX + 2 * move,offsetY)
				degree = 270
				break
			case direction == 'd':
				if(offsetX >= 8){
					tank.posX ++
					tank.offsetX = 0
				}else tank.offsetX = offsetX + move
				// this._clearArea(tank.posX,posY,tank.offsetX - 2 * move,offsetY)
				degree = 90
				break
		}
		this.c.drawImage(
			dummy._getRotateBlock(tankName,degree),
			tank.posX * this.step + tank.offsetX,
			tank.posY * this.step + tank.offsetY,
			this.len, this.len
		)
	}
	updateFire(fireC){
		if(fireC.fireArr.length === 0) return
		//TIP: to make sure there is least calculation, the code is redundant

		this.c.fillStyle = "#000"
		for(let fire of fireC.fireArr){
			let { direction, speed, size } = fire
			speed = speed / 5
			switch (direction){
				case "w":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyY -= speed
					break
				case "s":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyY += speed
					break
				case "a":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyX -= speed
					break
				case "d":
					this._drawFire(fire.accuracyX,fire.accuracyY,size)
					fire.accuracyX += speed
					break
				default:
					throw Error("WRONG DIRECTION")
			}
		}
	}
	fireOnBlock(fire, col, row){
		const { accuracyX, accuracyY } = fire
		let	img = ImageManager.getBitMap('blast7')
		img && this.c.drawImage(img, accuracyX - 2, accuracyY - 2, 6, 6)
		if(col !== undefined){
			this.destroyBlock(col,row)
		}
	}
	destroyBlock(col, row){
		this.alley[row][col] = 1
		this.material[row][col] = 0
	}
}

export class EditorGrid extends Grid{
	constructor(...props){
		super(...props)

		this.activePicker = null
		this.key_down = false
		this.coveredArea = []
		this.giantBlock = false

		//init the toolBar picker
	}
	init(map, canvas){
		super.init()
		window.document.addEventListener("resize",()=>{
			this.startPicker()
		})
		this.map = map
		this.partner = canvas
		this.startPicker()
	}
	drawInnerGiantBlock(col, row, type){
		let x = col * this.step + this.oX,
			y = row * this.step + this.oY,
			img = ImageManager.getBitMap(type)
		img && this.c.drawImage(img, x, y, this.len, this.len)
	}
	clearInnerGiant(col, row){
		let x = col * this.step + this.oX,
			y = row * this.step + this.oY
		this.c.fillStyle = "#000"
		this.c.fillRect(x,y,this.len,this.len)
	}
	drawBorder(){
		let w = this.step * this.map.width + 4,
			h = this.step * this.map.height + 4,
			x = (this.width - w) / 2 - 2,
			y = (this.height - h) / 2 - 2
		this.c.strokeStyle = "#ccc"
		this.c.lineWidth = 4
		this.c.strokeRect(x,y,w,h)
		this.oX = x + 2
		this.oY = y + 2
		this.partner.setOffset(this.oX,this.oY)
	}
	drawLine(self){
		/**
		 * there are three ways to draw a grid:
		 *  1.draw a single path or a few paths to constrain usage of CANVAS API
		 *  2.draw several rectangles to keep balance
		 *  3.draw a giant count of lines
		 *
		 *  TODO:check which method perform the best
		 *
		 * solution:
		 *  1.not yet
		 *  2.since each border of a rectangle is at least 2px, give up
		 *  3.may be the most effective API
		 */
		if(self === undefined) self = this
		let w = self.step * self.map.width + 4,
			h = self.step * self.map.height + 4,
			x = (self.width - w) / 2,
			y = (self.height - h) / 2

		self.c.strokeStyle = "#333"
		self.c.lineWidth = 1

		for(let row = 0;row < self.map.width;row += 2){
			self.c.moveTo(x+row*self.step+0.5,y)
			self.c.lineTo(x+row*self.step+0.5,h+y-4)
		}
		for(let col = 0;col < self.map.height;col += 2){
			self.c.moveTo(x,y+col*self.step+0.5,)
			self.c.lineTo(w+x-4,y+col*self.step+0.5,)
		}
		self.c.stroke()
	}
	drawItem(){
		let { partner: {sX, sY}, map} = this
		//this method returns the old position
		let { x, y } = map.changeItem(sX,sY,this.activePicker)
		if(x != undefined) this.clearInnerGiant(x,y)
		this.clearInnerGiant(sX,sY)
		//draw a new item
		this.drawInnerGiantBlock(sX,sY,this.activePicker)
	}
	drawArea(){
		const { partner: {endCol, endRow, sX, sY}, map} = this

		if(sX === endCol && sY === endRow){
			map.changeBlock(endCol,endRow,EditorGrid.MAPPER[this.activePicker][1])
			this._drawBlock(endRow,endCol,EditorGrid.MAPPER[this.activePicker][0])
			return
		}

		let xA = [sX,endCol],yA = [sY,endRow]

		//exchange the order of the numbers
		if(sX > endCol) {xA = [endCol,sX]}
		if(sY > endRow) {yA = [endRow,sY]}

		for(let i = xA[0];i < xA[1];i ++){
			for(let j = yA[0];j < yA[1];j ++){
				map.changeBlock(i,j,EditorGrid.MAPPER[this.activePicker][1])
				this._drawBlock(j,i,EditorGrid.MAPPER[this.activePicker][0])
			}
		}

		this.partner.clearSelection()
	}
	drawToolBar(){
		EditorGrid.PICKER.map(item=>{
			this._drawGiantBlock(item[0],item[1],item[2])
		})
	}
	startPicker(){
		let { map, width, height, step, ele: { offsetLeft, offsetTop } } = this
		offsetLeft = offsetLeft + this.ele.parentNode.offsetLeft
		offsetTop = offsetTop + this.ele.parentNode.offsetTop
		let listen = this.partner.ele.addEventListener
		listen("mousemove",e=>{
			let dX = e.x - offsetLeft - (width - step * map.width) / 2,
				dY = e.y - offsetTop - (height - step * map.height) / 2
			//press down a key
			if(this.key_down === true && this.giantBlock === false){
				//in the range of a grid
				if(dX >= 0 && dX <= map.width * step
				&& dY >= 0 && dY <= map.height * step){
					let col = (dX / step) >>> 0,
						row = (dY / step) >>> 0
					this.partner.drawSelection(col,row)
				}
			}
		})

		listen("mouseup",e=>{

			//rest the mouse and return
			this.key_down = false
			if(this.outterClick === true) return

			const {
				partner: {endCol, endRow, sX, sY},
				map: { player, friend, base, enemies }
			} = this, posArr = []

			const MAPPER = ["p1tankU","p2tankF","base","enemy1"]

			let xA = [sX,endCol],yA = [sY,endRow]

			//exchange the order of the numbers
			if(sX > endCol) {xA = [endCol,sX]}
			if(sY > endRow) {yA = [endRow,sY]}
			//serialize the items
			posArr.push(player,friend,base,...enemies)

			for(let index in posArr){
				let item = posArr[index],{x,y} = item
				let type = undefined

				if(x > xA[0] - 2 && x <= xA[1] && y > yA[0] - 2 && y <= yA[1]){
					if(index < 3) type = MAPPER[index]
					else type = MAPPER[3]
					//set a "undefined" value to make sure it's removed
					this.map.changeItem(undefined,undefined,type)
					this.clearInnerGiant(x,y)
				}
			}

			if(this.giantBlock === true){
				this.drawItem()
			}else{
				this.drawArea()
			}
			e.preventDefault()
		})

		listen("click",e=>{
			let x = e.x - offsetLeft,
				y = e.y - offsetTop

			//choose a picker to build
			EditorGrid.PICKER.map((item)=>{
				if((item[0] - 1) * step < x && (item[0] + 3) * step > x
					&& (item[1] - 1) * step < y && (item[1] + 3) * step > y) {

					switch(item[3]){
						case 1:
							this.activePicker = item[2]
							this.giantBlock = false
							break
						case 2:
							this.activePicker = item[2]
							this.giantBlock = true
							break
						case 3:
							if(item[2] === "quit"){
								//TODO: quit editor mode
							}else if(item[2] === "save"){
								this.map.insertMap()
							}
							break
						default:
							throw Error("NEW ERROR!")
					}
				}
			})
		})

		listen("mousedown",e=>{
			let dX = e.x - offsetLeft - (width - step * map.width) / 2,
				dY = e.y - offsetTop - (height - step * map.height) / 2

			this.key_down = true
			let col = (dX / step) >>> 0,
				row = (dY / step) >>> 0

			if(col > this.map.width || row > this.map.height){
				this.outterClick = true
				return
			}else {
				this.outterClick = false
				if(this.giantBlock === false){
					this.partner.startSelection(col,row)
					this.partner.drawSelection(col,row)
				}else{
					this.partner.startSelection(col,row)
					this.partner.drawSelection(col,row)
				}
			}

			e.preventDefault()
		})
	}
	static get PICKER(){
		return [
			[49,47,"bin",1],
			[29,47,"save",3],
			[69,47,"quit",3],
			[4,10,"base",2],
			[4,20,"p1tankU",2],
			[4,30,"p2tankF",2],
			[4,40,"enemy1",2],
			[94,10,"steels",1],
			[94,20,"grass",1],
			[94,30,"water",1],
			[94,40,"walls",1],
		]
	}
	static get MAPPER(){
		return {
			steels: ["stee",3],
			grass: ["gra",1],
			water: ["wate",2],
			walls: ["wall",4],
			bin: ["void",0]
		}
	}
}

export class  DummyGrid extends Grid{
	constructor(width, height) {
		super(width, height);
		this.width = 16
		this.height = 16
		this.len = 16
		this.init()
	}
	init() {
		this.ele = window.document.createElement("canvas")
		this.ele.width = this.width
		this.ele.height = this.height
		this.c = this.ele.getContext('2d')
	}
	_getRotateBlock(type, degree){
		this.c.clearRect(0,0,this.len,this.len)
		//we must draw the bitmap on 'this.c' ,so just take this as a param
		this.c.save()

		switch (degree){
			case 90:
				this.c.translate(this.len, 0)
				this.c.rotate(Math.PI/2)
				break
			case 180:
				this.c.translate(this.len, this.len)
				this.c.rotate(Math.PI)
				break
			case 270:
				this.c.translate(0, this.len)
				this.c.rotate(-Math.PI/2)
				break
			default:
		}

		super._drawGiantBlock(0,0,type,this)

		this.c.restore()
		return this.ele
	}
}

export default class Map extends Grid{
	constructor(...props){
		super(...props)
		this.width = props[0]
		this.height = props[1]
		//store the map we are drawing
		this.mapData = []
		this.base = {}
		this.player = {}
		this.friend = {}
		this.enemies = []
		this.init()
	}
	//init the map
	init(){
		let arr = []
		for(let i = 0;i < this.height;i ++){
			let tempArr = []
			for(let j = 0;j < this.width;j ++){
				tempArr.push(0)
			}
			arr.push([...tempArr])
		}
		this.mapData = arr
	}
	changeBlock(col, row, type){
		this.mapData[row][col] = type
	}
	changeItem(col, row, type){
		if(type === "p1tankU") {
			let lastPos = {x: this.player.x, y: this.player.y}
			this.player = {x: col, y: row}
			return lastPos
		}else if(type === "p2tankF"){
			let lastPos = {x: this.friend.x, y: this.friend.y}
			this.friend = {x: col, y: row}
			return lastPos
		}else if(type === "base"){
			let lastPos = {x: this.base.x, y: this.base.y}
			this.base = {x: col, y: row}
			return lastPos
		}else if(type === "enemy1") {
			if (col === undefined || row === undefined) return
			this.enemies.push({x:col,y:row})
		}
	}
	//draw from local storage
	static getMapList(){
		let maps = window.localStorage.getItem('mapList')
		return JSON.parse(maps)
	}
	insertMap(){
		let map = {
			size: {
				width: this.width,
				height: this.height
			},
			startPosition: [this.player],
			enemies: [{ x: 0, y: 0, type: [3,4] },],
			material: this.mapData
		}
		window.localStorage.setItem('mapList',JSON.stringify([map]))
	}
}