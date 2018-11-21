const newsTypeList = ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'];
const newsType = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']

Page({
	data: {
		nowType: 'gn',
		newsList: [],
		newsTypeList: newsTypeList
	},
	getNow(callback) {
		wx.request({
			url: 'https://test-miniprogram.com/api/news/list',
			data: {
				type: this.data.nowType
			},
			success: res => {
				console.log(res.data.result);
				let result = res.data.result;
				let newsList = [];

				let len = result.length;
				for (let i = 0; i < len; i++) {
					let news = {};
					news.id = result[i].id;
					news.title = result[i].title;
					news.date = result[i].date;
					news.date = news.date.slice(11, 16);
					news.author = result[i].source;
					news.img = result[i].firstImage;
					newsList.push(news);
				}
				this.setData({
					newsList: newsList
				});
			},
			complete: () => {
				callback && callback();
			}
		})
	},
	onLoad() {
		this.getNow();
	},
	onPullDownRefresh() {
		this.getNow(() => {
			wx.stopPullDownRefresh()
		})
	},
	//跳转到细节页面
	bindViewTap(e) {
		let index = parseInt(e.currentTarget.dataset.index);
		let newsid = this.data.newsList[index].id;
		wx.navigateTo({
			url: '/pages/details/details?id=' + newsid
		})
	},
	changeType(e) {
		let index = parseInt(e.currentTarget.dataset.index);
		let newtype = newsType[index];
		this.setData({
			nowType: newtype
		});
		this.getNow();
	}
})
