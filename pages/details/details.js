// pages/details/details.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newsId: 1523074607642,
		newsTitle:'',
		newsAuthor:'',
		newsTime: '',
		newsDate:'',
		newsImage: '',
		newsCount:'',
		newsContent:[],
		content:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			newsId: options.id ? options.id : this.data.newsId
		})
		this.getNow();
	},

	getNow(callback){
		wx.request({
			url: 'https://test-miniprogram.com/api/news/detail',
			data:{
				id: this.data.newsId
			},
			success: res => {
				console.log(res.data.result);
				console.log(this.data.newsId);
				let result = res.data.result;
				let newsContent = [];
				let content = result.content;
				this.setData({
					newsImage: result.firstImage || '/pictures/big-deft-img.png',
					newsTime: result.date.slice(11,16),
					newsDate: result.date.slice(0,10),
					newsCount: result.readCount,
					newsAuthor: result.source || '未知来源',
					newsTitle: result.title,
					newsContent: newsContent,
					content:content
				});
			},
			complete:()=>{
				callback && callback();
			}
		})
	},

})