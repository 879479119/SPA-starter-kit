/**
 * Created by zi on 2017/1/13.
 */

import Map, { Grid } from './scripts/map'
import { Player, Enemy } from './scripts/tank'
import Judge from './scripts/judge'
import { FireManager } from './scripts/Fire'

/**
 * there are four layers in a screen that should be rendered in order:
 *  1.block, steel, water
 *  2.tank, fire
 *  3.grass, fire-boom
 *  4.powerful items
 */

export default function init() {
	/*仅支持最新的chrome，firefox浏览器，可以运行es6代码的*/

	//get map source
	let grid = new Grid(800,400)
	let map = new Map(800,400)
	let player = new Player(2,2)
	let fireController = new FireManager()
	//draw construction

	//draw tanks
	grid.drawConstruction()
	grid.getAlley(true)
	grid._drawTank(map)
	player.init(fireController)

	//start moving frame by frame
	let frame = new Judge(grid, map, player, fireController, {})
	let i = 1
	let keyFrame = () => {
		grid.init(map)
		frame.go()
		requestAnimationFrame(keyFrame)
		if(i ++ > 1000) cancelAnimationFrame(animation)
	}
	let animation = window.requestAnimationFrame(keyFrame)
}

