module.exports = {
	devServer: {
		port: 8081
	},
	chainWebpack: (config) => {    
		config.plugin('html')
		.tap(args => {
			args[0].title = 'Система управления сервисом';
			args[0].meta = {viewport: 'width=device-width,initial-scale=1,user-scalable=no'};
			return args;
		})
	}
}