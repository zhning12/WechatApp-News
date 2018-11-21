// pages/details/details.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newsId:'1523074607642'

	},

	getNow:(callback)=>{
		wx.request({
			url: 'https://test-miniprogram.com/api/news/detail',
			data:{
				id: newsId
			},
			success: res => {
				console.log(res.data);
			},
			complete:()=>{
				callback && callback();
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			newsId: options.id
		})
		this.getNow();
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