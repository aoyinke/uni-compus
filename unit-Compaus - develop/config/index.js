let baseConfig = {
	host: "http://localhost",
	// host: "https://www.uniCompus.com",
	port: "3000",
	img_example: "https://lz.sinaimg.cn",

}

let cooperateItems = [{
		icon: "./task.png",
		choice: "发布任务",
		backgroundImage: "linear-gradient(rgba(253, 150, 68,0.7),rgba(250, 130, 49,1.0))"
	},
	{
		icon: "../../static/self/eye.png",
		choice: "待处理的工作",
		backgroundImage: "linear-gradient(rgba(253, 114, 114,0.7),rgba(252, 66, 123,1.0))"
	},
	{
		icon: "../../static/self/eye.png",
		choice: "兴趣社区",
		backgroundImage: "linear-gradient(rgba(205, 132, 241,0.7),rgba(197, 108, 240,1.0))"
	},
	{
		icon: "./task.png",
		choice: "资料编辑",
		backgroundImage: "linear-gradient(rgba(52, 231, 228,0.7),rgba(15, 188, 249,1.0))"
	},
	{
		icon: "./task.png",
		choice: "成员管理",
		backgroundImage: "linear-gradient(rgba(11, 232, 129,0.7),rgba(5, 196, 107,1.0))"
	},
	{
		icon: "./task.png",
		choice: "发布合集",
		backgroundImage: "linear-gradient(rgba(249, 202, 36,0.7),rgba(240, 147, 43,1.0))"
	},
]

const collections = [{
		type: '往期活动',
		nums: 124,
		coverImg: "https://img.pixbe.com/p47810601/BB381FBF431A489C96419E312E6494F3_640.jpg",
		backgroundImage: "linear-gradient(#2bcbba,#20bf6b,#45aaf2)"
	},

	{
		type: '活动动态',
		nums: 13,
		coverImg: "https://img.pixbe.com/p47810601/3F31DCAAB5A3480997A08BE976B98D87_640.jpg",
		backgroundImage: "linear-gradient(#fc5c65,#eb3b5a,#fd9644)"
	},

	// {type:'参与的问答',
	// nums:127,
	// coverImg:"https://img.pixbe.com/p47810601/E124CB219C59429A82FB9443D28EFF4C_640.jpg",
	// backgroundImage:"linear-gradient(#fd9644,#fa8231,#eb3b5a)"},

	{
		type: '发布的知识',
		nums: 113,
		coverImg: "https://img.pixbe.com/p47810601/22C15EC68FB04C7EB7A3F8668F59ED7E_640.jpg",
		backgroundImage: "linear-gradient(#a55eea,#8854d0,#3867d6)"
	}
]
export {
	baseConfig,
	cooperateItems,
	collections
}
