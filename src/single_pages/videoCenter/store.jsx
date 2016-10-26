import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import fetchMiddleware from './utils/fetch/index'

const loggerMiddleware = createLogger();

//TODO: 之后把获取初始主题的事情放到这里

//性能调试和打包时删掉 loggerMiddleware,并且必须要把他放在最后一个！
export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware,
				fetchMiddleware,
				loggerMiddleware
			)
		)
	)
}
