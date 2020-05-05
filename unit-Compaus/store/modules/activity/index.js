import {ADD_ACTIVITYINFO,ADD_GROUPDYNAMIC,ADD_KNOWLEDGE} from './mutationName.js'
export default {
	state: {
		activityInfo: {
			concern: [{
				groupId: 1,
				groupLogo: "../../static/test/waterfull/1.jpg",
				groupName: "比赛大佬组",
				activityStartTime: "17小时前",
				img: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
					"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/65c1341906284d.jpg!1200w.jpg",

				],
				hotNum: 80,
				commentNum: 6,
				commentDetail: [{
						commentor: "天堂屠夫",
						commentContent: "nb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "tnb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "cznb....."
					}
				]
			}],
			dance: [{
				groupId: 1,
				groupLogo: "../../static/test/waterfull/1.jpg",
				groupName: "比赛大佬组",
				activityStartTime: "17小时前",
				img: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
					"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/65c1341906284d.jpg!1200w.jpg",

				],
				hotNum: 80,
				commentNum: 6,
				commentDetail: [{
						commentor: "天堂屠夫",
						commentContent: "nb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "tnb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "cznb....."
					}
				]
			}]

		},
		groupDynamic: {
			concern: [{
				description: "造成血清素减少的原因有很多，包括压力、缺乏睡眠、营养不良和缺乏锻炼等。在降低到需要数量以下时，人们就会出现注意力集中困难等问题，会间接影响个人计划和组织能力。这种情况还经常伴随压力和厌倦感，如果血清素水平进一步下降，还会引起抑郁。",
				groupLogo: "https://images.mepai.me/app/works/38224/2018-10-04/w_5bb5e9f9c3b29/05bb5e9fa341d0.jpg!1200w.jpg",
				groupName: "比赛大佬组",
				activityStartTime: "17小时前",
				img: ["https://images.mepai.me/app/works/38224/2018-12-18/w_5c18bc473ef0f/05c18bc47408ea.jpg!1200w.jpg",
					"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/75c13419062809.jpg!1200w.jpg",
					"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/55c1341906288f.jpg!1200w.jpg"

				],
				hotNum: 80,
				commentNum: 6,
				commentDetail: [{
						commentor: "天堂屠夫",
						commentContent: "nb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "tnb....."
					},
					{
						commentor: "天堂屠夫",
						commentContent: "cznb....."
					}
				]
			}],
		},
		// answer: [],
		knowledge: {
			concern: [{
					groupLogo: "https://images.mepai.me/app/works/38224/2018-10-04/w_5bb5e9f9c3b29/05bb5e9fa341d0.jpg!1200w.jpg",
					groupName: "比赛大佬组",
					activityStartTime: "17小时前",
					img: ["https://images.mepai.me/app/works/38224/2018-12-18/w_5c18bc473ef0f/05c18bc47408ea.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/75c13419062809.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/55c1341906288f.jpg!1200w.jpg"

					],
					hotNum: 80,
					commentNum: 6,
					commentDetail: [{
							commentor: "天堂屠夫",
							commentContent: "nb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "tnb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "cznb....."
						}
					]
				},
				{
					description: "造成血清素减少的原因有很多，包括压力、缺乏睡眠、营养不良和缺乏锻炼等。在降低到需要数量以下时，人们就会出现注意力集中困难等问题，会间接影响个人计划和组织能力。这种情况还经常伴随压力和厌倦感，如果血清素水平进一步下降，还会引起抑郁。",
					groupLogo: "https://images.mepai.me/app/works/38224/2018-10-04/w_5bb5e9f9c3b29/05bb5e9fa341d0.jpg!1200w.jpg",
					groupName: "比赛大佬组",
					activityStartTime: "17小时前",
					hotNum: 80,
					commentNum: 6,
					commentDetail: [{
							commentor: "天堂屠夫",
							commentContent: "nb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "tnb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "cznb....."
						}
					]
				}
			]
		}
	},
	actions:{},
	mutations:{
		[ADD_ACTIVITYINFO](state,payload){
			switch(payload.type){
				case 100:
					state.activityInfo.push(payload)
					break;
				case 200:
					state.groupDynamic.push(payload)
					break;
				case 400:
					state.knowledge.push(payload)
					break;
			}
			
		}
	}

}
