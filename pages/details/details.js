// pages/details/details.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newsId: 1523074607642,
		newsTitle:'',
		newsAuthor:'',
		newsDate: '',
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
				let len = result.content.length;
				for(let i=0; i<len;i++){
					newsContent[i]=`<${content[i].type} src='${content[i].src}'>${content[i].text}</${content[i].type}>`;
				}
				this.setData({
					newsImage: result.firstImage,
					newsDate: result.date.slice(11,16),
					newsCount: result.readCount,
					newsAuthor: result.source,
					newsTitle: result.title,
					newsContent: newsContent,
					content:content
				})
				
			},
			complete:()=>{
				callback && callback();
			}
		})
	},


	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

})