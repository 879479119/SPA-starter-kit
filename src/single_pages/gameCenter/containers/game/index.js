/**
 * Created by zi on 2017/1/13.
 */

import Map, { Grid } from './scripts/map'
import { ImageManager } from './scripts/Manager'

export default function init() {
	/*仅支持最新的chrome，firefox浏览器，可以运行es6代码的*/

	//get map source
	let grid = new Grid(800,400)
	let map = new Map(800,400)
	let mapSource = map.getMapList()
	//get data from local storage
	grid.drawConstruction(map)
	//draw construction
	ImageManager.getBitMap("water")
	//draw tanks



}

